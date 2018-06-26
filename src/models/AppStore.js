import { observable } from 'mobx';


class AppStore {
    @observable state = ["weather app"]
}

const appStore = new AppStore();

export default appStore;