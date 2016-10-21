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

const simpleMenuItems = mainMenu.items();

const membersOverviewRoute = FlowRouter.route('/members');
mainMenu.addItem(membersOverviewRoute, 'Members');

const breadCrumbMenu = new Menu();
for (let x of simpleMenuItems) breadCrumbMenu.addItem(x);
const memberRoute = FlowRouter.route('/member/:memberId');
const membersMenu = new Menu({route: membersOverviewRoute});
breadCrumbMenu.addItem(membersMenu, "Members");
membersMenu.addItem(memberRoute, function() {
    return "Member with id: " + FlowRouter.getParam('memberId')
});

Template.body.helpers({
    mainMenu, breadCrumbMenu,
    path() {
        FlowRouter.watchPathChange();
        return FlowRouter.current().path;
    }
});

Template.routeItem.events({
    click() { if (this.hasRoute()) this.visit() }
});