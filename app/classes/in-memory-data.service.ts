import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let meeting = [
            { id:1,title:'mis',date:'10-2-2020',place:'alex',purpose:'gathering',priority:'Max',state:'Active' }
        ];
        return {meeting};
    }
}
