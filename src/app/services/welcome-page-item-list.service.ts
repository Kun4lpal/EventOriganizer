import { Events } from '../Data/event';



export class WelcomePageItemListService{
    listOfEvents;

    getEventList(){
        this.listOfEvents=Events;
        return this.listOfEvents;
    }
}