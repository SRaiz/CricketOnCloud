/*
    @Author         : Sidharth Pushp
    @BuildDate      : 18th March, 2024
    @Description    : This class will be called from the Trigger and then will redirect to the correct handler
    @Updates        : 
*/
public with sharing class TriggerDispatcher {
    
    /*
        @Author         : Sidharth Pushp
        @BuildDate      : 18th March, 2024
        @Description    : Fetch the Trigger Settings Records and check in which context Trigger can be executed.
        @Params         : ITriggerInterface handler , String objectName
        @Return         : void
    */
    public static void run ( ITriggerInterface handler , String objectName ) {
        
        List<TriggerSetting__mdt> triggerSettingList = new List<TriggerSetting__mdt>();
        triggerSettingList = [ 
            Select 
                Id, Disabled__c, ObjectName__c, BeforeUpdate__c, BeforeInsert__c, 
                BeforeDelete__c, AfterUpdate__c, AfterUndelete__c, AfterInsert__c, AfterDelete__c, 
                PreventRecursion__c 
            From TriggerSetting__mdt 
            Where 
                ObjectName__c =: objectName 
        ];
        
        execute( handler, triggerSettingList );
    }

    /*
        @Author         : Sidharth Pushp
        @BuildDate      : 18th March, 2024
        @Description    : Execute will redirect to the correct method of the handler class..
        @Params         : ITriggerInterface handler, List<TriggerSetting__mdt> triggerSetting
        @Return         : void
    */
    private static void execute ( ITriggerInterface handler, List<TriggerSetting__mdt> triggerSetting ) {

        if ( triggerSetting != null && triggerSetting.size() > 0 ){
            if ( triggerSetting[0].Disabled__c ) {
                return;
            } 
        } 
        else {
            throw new TriggerException ( 
                'No Trigger Setting Record found! Please create an entry for ' +
                ' Trigger Settings Object or Contact your administrator.'
            );
        }
        
        //-- If trigger is executing in before context then route to the before context methods --//
        if ( Trigger.isBefore ) {
            
            if ( Trigger.isInsert && triggerSetting[0].BeforeInsert__c ) {
                handler.beforeInsert( Trigger.new );
            }

            if ( Trigger.isUpdate && triggerSetting[0].BeforeUpdate__c ) {
                handler.beforeUpdate( Trigger.newMap, Trigger.oldMap );
            }

            if ( Trigger.isDelete && triggerSetting[0].BeforeDelete__c ){
                handler.beforeDelete( Trigger.old, Trigger.oldMap );
            }
        }
        
        //-- If trigger is executing in after context then route to the after context methods --//
        if ( Trigger.isAfter ){
            
            if ( Trigger.isInsert && triggerSetting[0].AfterInsert__c ) {
                handler.afterInsert( Trigger.new, Trigger.newMap );
            }
            
            //-- If the trigger is executing in after update context check for field change. If not then handler is not called to prevent the recursion. --//
            if ( Trigger.isUpdate && triggerSetting[0].AfterUpdate__c ) {
                Map<Id, sObject> newItemsMap = new map<Id, sObject>();
                Map<Id, sObject> oldItemsMap = new map<Id, sObject>();
                List<String> fieldAPINameList = new List<String>();
                
                if ( triggerSetting[0].PreventRecursion__c != null ) {
                    fieldAPINameList = triggerSetting[0].PreventRecursion__c.split(',');
                }
                
                for ( sObject obj : Trigger.newMap.Values() ) {
                    for ( String field : fieldAPINameList ) {
                        if ( obj.get( field.trim() ) != Trigger.oldMap.get(obj.Id).get(field.trim())) {
                            if ( !newItemsMap.containsKey( obj.Id )) {
                                newItemsMap.put( obj.Id, obj );
                            }
                            if ( !oldItemsMap.containsKey( obj.Id )) {
                                oldItemsMap.put( obj.id, Trigger.oldMap.get( obj.Id ));
                            }
                        }
                    }
                }
                handler.afterUpdate( newItemsMap , oldItemsMap );
            }
            
            if ( Trigger.isDelete && triggerSetting[0].AfterDelete__c ) {
                handler.afterDelete( Trigger.oldMap );
            }
            
            if ( Trigger.isUndelete && triggerSetting[0].AfterUndelete__c ) {
                handler.afterUndelete( Trigger.new , Trigger.newMap );
            }
        }
    }
}