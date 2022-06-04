import "isomorphic-fetch"
import {response, wait} from "yarn/lib/cli";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";
import {
    addEventOwner,
    allEvents,
    eventManager,
    getOrPostEventSuppliers,
    postEventSchedule,
    remote_base_url
} from "../constants/urls";
import fetchTimeout from "fetch-timeout";
const {logApiRequest} = require("../constants/logger");
const {base_url, register, userDelete, login, getEvent} = require("../constants/urls");
const Log = require("../constants/logger");

var user_id = 1;
var auth= "";
var event_id = 1;

async function registerUser(user) {
    let url = base_url + register;
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }
    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            if(responseJSON.id){
                user_id = responseJSON.id;
            }
            return JSON.stringify(responseJSON);
        });
}

async function loginuser(username) {
    console.log("============login---------")
    await fetchTimeout(
        base_url + login,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password: "8111996",
            }),
        },
        2000,
        "Timeout"
    )
        .then(async (res) => {
            const data = await res.json();
            console.log(data)
            auth = data.token
            user_id = data.id;
        });
}

async function deleteUser(user_id){

    let url = base_url + userDelete(user_id);
    await fetchTimeout(
        url,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${auth}`,
            }
        },
        2000,
        "Timeout"
    ).then(async (res) => {
        const data = await res.json();
        console.log(data)
    });
}

async function postEventManager(user_id){

    console.log("============post event manager========");
    let url = base_url + eventManager(user_id);
    console.log(auth)
    console.log(user_id)
    await fetchTimeout(
        url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${auth}`,
            }
        },
        2000,
        "Timeout"
    ).then(async (res) => {
        const data = await res.json();
    });
}

async function getEventManager(user_id){

    console.log("============GET event manager========");
    let url = base_url + eventManager(user_id);
    console.log(auth)
    console.log(user_id)
    let request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${auth}`,
        },
    }

    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            return JSON.stringify(responseJSON);
        });
}

async function postEvent(){

    let url = base_url + allEvents;
    console.log(auth)
    console.log(user_id)
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${auth}`,
        },
        body: JSON.stringify(event)
    }

    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(JSON.stringify(responseJSON));
            if(responseJSON.id){
                event_id = responseJSON.id;
            }
            return JSON.stringify(responseJSON);
        });
}

async function postEventOwner(event_owner){

    let url = base_url + addEventOwner(event_id);
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${auth}`,
        },
        body: JSON.stringify(event_owner)
    }

    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            return JSON.stringify(responseJSON);
        });
}

async function postSupplier(supplier){

    let url = base_url + getOrPostEventSuppliers(event_id);
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${auth}`,
        },
        body: JSON.stringify(supplier)
    }

    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            return JSON.stringify(responseJSON);
        });
}

async function posteventschedule(event_schedule){

    let url = base_url + postEventSchedule(event_id);
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${auth}`,
        },
        body: JSON.stringify(event_schedule)
    }

    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            return JSON.stringify(responseJSON);
        });
}


async function geteventsub(subtype){

    let url = base_url + `/api/events/${event_id}/${subtype}/`
    let request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${auth}`,
        }
    }

    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(JSON.stringify(responseJSON))
            return JSON.stringify(responseJSON);
        });
}

function User(name,email,password,phone,address) {
    this.name = name;
    this.email= email;
    this.password= password;
    this.phone= phone;
    this.address = address;
}

function Event(type,event_name,date,budget,location) {
    this.type = type;
    this.event_name= event_name;
    this.date= date;
    this.budget= budget;
    this.location = location;
}

function eventOwner(name,phone) {
    this.name = name;
    this.phone= phone;
}

function Supplier(name,phone,job,price) {
    this.name = name;
    this.phone= phone;
    this.job = job;
    this.price = price;
}

function eventSchedule(from,to,description) {
    this.start_time = from;
    this.end_time= to;
    this.description = description;
}

function Address(country, city, street, number) {
    this.country = country;
    this.city = city;
    this.street = street;
    this.number = number;
}
const user = new User(
    "reut",
    "reutlevy26@gmail.com",
    "8111996",
    "0546343178",
    new Address("Israel", "timmorm", "Alon", 208)
);

const event = new Event(
    "wedding",
    "hadas@roee",
    "2022-10-08",
    "400",
    "Israel"
);

const eventownervalid = new eventOwner(
    "amit",
    "0546343178"
)

const suppliervalid = new Supplier(
    "reut",
    "0546343178",
    "flowers",
    "1000"
)

const eventschvalid = new eventSchedule(
    "2022-10-12 06:00",
    "2022-10-12 07:00",
    "flowers meeting",
)

const eventownernotvalid = new eventOwner(
    "amit",
    ""
)

const suppliernotvalid = new Supplier(
    "reut",
    "",
    "flowers",
    "1000"
)

const eventschnotvalid = new eventSchedule(
    "2022-10-12",
    "2022-10-12",
    "flowers meeting",
)
describe('event addition tests', () => {

    beforeAll(async () => {
        await registerUser(user);
        await loginuser(user.email);
        await postEventManager(user_id);
        await postEvent();
    })

    test('check get event owner from event', async () => {
        await postEventOwner(eventownervalid);
        await expect(geteventsub("event_owner")).resolves.toMatch(/(amit)/i)
    });

    test('check get event owner wrong name', async () => {
        await postEventOwner(eventownervalid);
        await expect(geteventsub("event_owner")).resolves.not.toMatch(/(daniel)/i)
    });

    test('check get event supplier', async () => {
        await postSupplier(suppliervalid);
        await expect(geteventsub("supplier")).resolves.toMatch(/(reut)/i)
    });

    test('check get event supplier wrong name', async () => {
        await postSupplier(suppliervalid);
        await expect(geteventsub("supplier")).resolves.not.toMatch(/(amit)/i)
    });

    test('check get event schedule name', async () => {
        await posteventschedule(eventschvalid);
        await expect(geteventsub("event_schedule")).resolves.toMatch(/(flowers)/i)
    });

    test('check get event schedule from', async () => {
        await posteventschedule(eventschvalid);
        await expect(geteventsub("event_schedule")).resolves.toMatch(/(2022-10-12)/i)
    });

    test('check get event schedule wrong name', async () => {
        await posteventschedule(eventschvalid);
        await expect(geteventsub("event_schedule")).resolves.not.toMatch(/(food meeting)/i)
    });

    test('post supplier not valid', async () => {
        await expect(postSupplier(suppliernotvalid)).resolves.toMatch(/(error)/i)
    });

    test('post event schedule not valid', async () => {
        await expect(posteventschedule(eventschnotvalid)).resolves.toMatch(/(error)/i)
    });

    test('post event owner not valid', async () => {
        await expect(postEventOwner(eventownernotvalid)).resolves.toMatch(/(error)/i)
    });

})

