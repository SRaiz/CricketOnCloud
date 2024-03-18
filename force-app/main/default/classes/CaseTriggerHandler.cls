/*
    @Author 		: Sidharth Pushp
    @BuildDate 		: 18th March, 2024
    @Description 	: This handler class is related to Case trigger and we should make sure that there should be only 1 trigger handler per object.
    @Updates        :
*/
public class CaseTriggerHandler implements ITriggerInterface {
	
    /*
        @Author 		: Sidharth Pushp
        @BuildDate 		: 18th March, 2024
        @Description 	: Called by the trigger framework before insert of the records
        @Params 		: List<sObject> newRecordsList
		@Return			: void
    */
    public void beforeInsert ( List<sObject> newRecordsList ) {
        
    }
    
    /*
        @Author 		: Sidharth Pushp
        @BuildDate 		: 18th March, 2024
        @Description 	: Called by the trigger framework after insert of the records
        @Params 		: List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap
		@Return			: void
    */
    public void afterInsert ( List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap ) {

    }
	
    /*
        @Author 		: Sidharth Pushp
        @BuildDate 		: 18th March, 2024
        @Description 	: Called by the trigger framework before update of the records
        @Params 		: Map<Id, sObject> newRecordsMap , Map<Id, sObject> oldRecordsMap
		@Return			: void
    */
    public void beforeUpdate ( Map<Id, sObject> newRecordsMap, Map<Id, sObject> oldRecordsMap ) {

    }
    
    /*
        @Author 		: Sidharth Pushp
        @BuildDate 		: 18th March, 2024
        @Description 	: Called by the trigger framework after update of the records
		@Params 		: Map<Id, sObject> newRecordsMap , Map<Id, sObject> oldRecordsMap
		@Return			: void
    */
    public void afterUpdate ( Map<Id, sObject> newRecordsMap, Map<Id, sObject> oldRecordsMap ) {
        
    }
    
    /*
        @Author 		: Sidharth Pushp
        @BuildDate 		: 18th March, 2024
        @Description 	: Called by the trigger framework before delete of the records
        @Params 		: List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap
		@Return			: void
    */
    public void beforeDelete ( List<sObject> oldRecordsList , Map<Id, sObject> oldRecordsMap ) {

    }
	
    /*
        @Author 		: Sidharth Pushp
        @BuildDate 		: 18th March, 2024
        @Description 	: Called by the trigger framework after delete of the records
        @Params 		: Map<Id, sObject> oldRecordsMap
		@Return			: void
    */
    public void afterDelete( Map<Id, sObject> oldRecordsMap ) {

    }

    /*
        @Author 		: Sidharth Pushp
        @BuildDate 		: 18th March, 2024
        @Description 	: Called by the trigger framework after undelete of the records
        @Params 		: List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap
		@Return			: void
    */
    public void afterUndelete( List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap ) {

    }
}