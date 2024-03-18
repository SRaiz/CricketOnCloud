/*
    @Author 		: Sidharth Pushp
    @BuildDate 		: 18th March, 2024
    @Description 	: This is an interface for the trigger. Apex interface contains the methods that needs 
					  to be implemented while developing the handler class even if there is no logic for those methods.
    @Updates        : 
*/
public Interface ITriggerInterface {
    
    /*
        @Author 		: Sidharth Pushp
        @BuildDate 		: 18th March, 2024
        @Description 	: Called by the trigger framework before insert of the records
        @Params 		: List<sObject> newRecordsList
		@Return			: void
    */
    void beforeInsert( List<sObject> newRecordsList );
    
    /*
        @Author 		: Sidharth Pushp
        @BuildDate 		: 18th March, 2024
        @Description 	: Called by the trigger framework after insert of the records
        @Params 		: List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap
		@Return			: void
    */
    void afterInsert( List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap );
    
    /*
        @Author 		: Sidharth Pushp
        @BuildDate 		: 18th March, 2024
        @Description 	: Called by the trigger framework before update of the records
        @Params 		: Map<Id, sObject> newRecordsMap , Map<Id, sObject> oldRecordsMap
		@Return			: void
    */
    void beforeUpdate( Map<Id, sObject> newRecordsMap , Map<Id, sObject> oldRecordsMap );
    
    /*
        @Author 		: Sidharth Pushp
        @BuildDate 		: 18th March, 2024
        @Description 	: Called by the trigger framework after update of the records
		@Params 		: Map<Id, sObject> newRecordsMap , Map<Id, sObject> oldRecordsMap
		@Return			: void
    */
    void afterUpdate( Map<Id, sObject> newRecordsMap , Map<Id, sObject> oldRecordsMap );
    
    /*
        @Author 		: Sidharth Pushp
        @BuildDate 		: 18th March, 2024
        @Description 	: Called by the trigger framework before delete of the records
        @Params 		: List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap
		@Return			: void
    */            
    void beforeDelete( List<sObject> oldRecordsList , Map<Id, sObject> oldRecordsMap );
    
    /*
        @Author 		: Sidharth Pushp
        @BuildDate 		: 18th March, 2024
        @Description 	: Called by the trigger framework after delete of the records
        @Params 		: Map<Id, sObject> oldRecordsMap
		@Return			: void
    */
    void afterDelete( Map<Id, sObject> oldRecordsMap );
    
    /*
        @Author 		: Sidharth Pushp
        @BuildDate 		: 18th March, 2024
        @Description 	: Called by the trigger framework after undelete of the records
        @Params 		: List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap
		@Return			: void
    */
    void afterUnDelete( List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap );
}