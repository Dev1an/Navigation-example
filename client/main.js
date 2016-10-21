import {Menu} from 'meteor/devian:navigation'
import {FlowRouter} from 'meteor/kadira:flow-router'

const mainMenu = new Menu();

mainMenu.route('/', {name: 'Home'});
const products = mainMenu.group({
    prefix: '/products',
    name: 'Products',
});

products.route('/iPodCase', {name: 'iPod Case'});
products.route('/iPhoneCase', {name: 'iPhone Case'});

const laptopAccessories = products.group({
    prefix: '/laptopAccessories',
    name: 'Laptop accessories'
});

laptopAccessories.route('/macbook-pro', {name: ()=>`MacBook Pro (${new Date().getFullYear()})`});
laptopAccessories.route('/macbook-air', {name: 'MacBook Air'});
laptopAccessories.route('/overview', {menuRoute: true});

const members = mainMenu.group({prefix: '/members', name: 'Memebers'});
members.route('/overview', {menuRoute: true});
members.route('/:memberId', {name() {return 'member with id: ' + FlowRouter.getParam('memberId')}});

Template.body.helpers({
    mainMenu,
    path() {
        FlowRouter.watchPathChange();
        return FlowRouter.current().path;
    }
});

Template.routeItem.events({
    click() { if (this.hasRoute()) this.visit() }
});