/*
    @Author 		: Sidharth Pushp
    @BuildDate 		: 18th March, 2024
    @Description 	: CaseTrigger on Case calls the "run" method of the TriggerDispatcher class 
					  to start the execution of trigger framework
*/
trigger CaseTrigger on Case ( before insert, after insert, before update, 
                             after update, before delete, after delete, after undelete ) {
	TriggerDispatcher.run( new CaseTriggerHandler() , Constants.CASE_OBJ );
}