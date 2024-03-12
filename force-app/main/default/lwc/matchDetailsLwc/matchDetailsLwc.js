import { api, LightningElement } from 'lwc';

//-- Get a reference to match and its fields in the component --//
import MATCH from '@salesforce/schema/Game__c';
import MATCH_TITLE from '@salesforce/schema/Game__c.MatchTitle__c';
import HOME_TEAM from '@salesforce/schema/Game__c.HomeTeam__c';
import AWAY_TEAM from '@salesforce/schema/Game__c.AwayTeam__c';
import TOURNAMENT from '@salesforce/schema/Game__c.Tournament__c';
import MATCH_TYPE from '@salesforce/schema/Game__c.MatchType__c';
import OVERS from '@salesforce/schema/Game__c.Overs__c';
import MATCH_START_TIME from '@salesforce/schema/Game__c.MatchStartTime__c';
import STADIUM from '@salesforce/schema/Game__c.Stadium__c';

const FIELDS = [
    MATCH_TITLE, 
    HOME_TEAM, 
    AWAY_TEAM, 
    TOURNAMENT, 
    MATCH_TYPE, 
    OVERS, 
    MATCH_START_TIME, 
    STADIUM
];

export default class MatchDetailsLwc extends LightningElement {
    @api recordId;
    matchObjApiName = MATCH;
    matchFields = FIELDS;
}