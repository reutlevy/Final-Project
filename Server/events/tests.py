import json
from datetime import datetime

from django.test import TestCase

# Create your tests here.
from django.test import TestCase, Client

# Create your tests here.
from django.urls import reverse
from rest_framework.templatetags import rest_framework

from addresses.serializers import AddressSerializer
from events.models import Event, EventSchedule
from suppliers.serializers import SupplierSerializer
from users import views
from users.models import User, EventManager
from addresses.models import Address
from rest_framework.test import APITestCase, APIClient


class UserCreateListTest(APITestCase):

    def setUp(self):
        self.client = APIClient()
        url = reverse('user:user-list')
        data = {
            "country": "israel",
            "city": "timmorim",
            "street": "alon",
            'number': 6
        }

        serializer = AddressSerializer(data=data)
        if serializer.is_valid():
            address = serializer.validated_data
        response_register = self.client.post(url,
                                             {'email': 'roeebenhouse@gmail.com',
                                              'name': 'roee',
                                              'password': '8111996',
                                              'phone': '0546343178',
                                              "address": serializer.data}, format='json')
        id = response_register.data['id']
        url = reverse('user:login')
        response_login = self.client.post(url,
                                          {"username": "roeebenhouse@gmail.com",
                                           "password": "8111996", }
                                          , format='json')
        self.token = response_login.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        url = reverse('user:event_manager', kwargs={'user_id': id})
        self.client.post(url)

    def test_add_event(self):
        url = reverse('events:event-list')
        token = f"Token {self.token}"
        supplier1 = {
            "name": "reut",
            "price": 1000,
            "advance_pay": 1500,
            'pay_method': "bit"
        }
        supplier2 = {
            "name": "reut2",
            "price": 1000,
            "advance_pay": 1500,
            'pay_method': "bit"
        }
        meeting1 = {
            "description": "flowers",
            "date": '2022-09-23',
            "time": '18:00',
            "location": "tel-aviv"
        }
        response = self.client.post(url,
                                    {"type": "wedding",
                                     "event_name": "roy&hadas",
                                     'date': '2022-09-23',
                                     'budget': '100000',
                                     'location': 'Keisaria',
                                     'events_owners': 'Roy',
                                     'suppliers': [supplier2, supplier1],
                                     'meetings': [meeting1]}
                                    , format='json')
        event_id = response.data['id']
        assert response.status_code == 201
        self.assertTrue(Event.objects.get(event_name='roy&hadas'))

        url = reverse('events:event-event_schedule_router-list', kwargs={'event_pk': event_id})
        response = self.client.post(url,
                                    {"start_time": "2022-09-23 18:00",
                                     "end_time": "2022-09-23 20:00",
                                     'description': 'reception', }
                                    , format='json')
        self.assertTrue(EventSchedule.objects.get(description='reception'))
        assert response.status_code == 201

    def test_add_event_fail_forbidden(self):
        data = {
            "country": "Israel",
            "city": "Kadima",
            "street": "alon",
            'number': 6
        }
        supplier1 = {
            "name": "reut",
            "price": 1000,
            "advance_pay": 1500,
            'pay_method': "bit"
        }
        supplier2 = {
            "name": "reut2",
            "price": 1000,
            "advance_pay": 1500,
            'pay_method': "bit"
        }
        meeting1 = {
            "description": "flowers",
            "date": '2022-09-23',
            "time": '18:00',
            "location": "tel-aviv"
        }
        url = reverse('user:user-list')
        serializer = AddressSerializer(data=data)
        if serializer.is_valid():
            address = serializer.validated_data
        response_register = self.client.post(url,
                                             {'email': 'amitrub@gmail.com',
                                              'name': 'amit',
                                              'password': '8111996',
                                              'phone': '0546343178',
                                              "address": serializer.data}, format='json')
        id = response_register.data['id']
        url = reverse('user:login')
        response_login = self.client.post(url,
                                          {"username": "amitrub@gmail.com",
                                           "password": "8111996", }
                                          , format='json')
        self.token = response_login.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        url = reverse('events:event-list')
        response = self.client.post(url,
                                    {"type": "wedding",
                                     "event_name": "roy&hadas",
                                     'date': '2022-09-23',
                                     'budget': '100000',
                                     'location': 'Keisaria',
                                     'events_owners': 'Roy',
                                     'suppliers': [supplier2, supplier1],
                                     'meetings': [meeting1]
                                     }
                                    , format='json')
        assert response.status_code == 403

    def test_add_event_fail_wrong_date(self):
        url = reverse('events:event-list')
        token = f"Token {self.token}"
        supplier1 = {
            "name": "reut",
            "price": 1000,
            "advance_pay": 1500,
            'pay_method': "bit"
        }
        supplier2 = {
            "name": "reut2",
            "price": 1000,
            "advance_pay": 1500,
            'pay_method': "bit"
        }
        meeting1 = {
            "description": "flowers",
            "date": '2022-09-23',
            "time": '18:00',
            "location": "tel-aviv"
        }
        response = self.client.post(url,
                                    {"type": "wedding",
                                     "event_name": "roy&hadas",
                                     'date': '202dfsdfd2-09-23',
                                     'budget': '100000',
                                     'location': 'Keisaria',
                                     'events_owners': 'Roy',
                                     'suppliers': [supplier2, supplier1],
                                     'meetings': [meeting1]}
                                    , format='json')
        assert response.status_code == 400

    def test_add_event_fail_missing_detail(self):
        url = reverse('events:event-list')
        token = f"Token {self.token}"
        supplier1 = {
            "name": "reut",
            "price": 1000,
            "advance_pay": 1500,
            'pay_method': "bit"
        }
        supplier2 = {
            "name": "reut2",
            "price": 1000,
            "advance_pay": 1500,
            'pay_method': "bit"
        }
        meeting1 = {
            "description": "flowers",
            "date": '2022-09-23',
            "time": '18:00',
            "location": "tel-aviv"
        }
        response = self.client.post(url,
                                    {
                                     "event_name": "roy&hadas",
                                     'date': '202dfsdfd2-09-23',
                                     'budget': '100000',
                                     'location': 'Keisaria',
                                     'events_owners': 'Roy',
                                     'suppliers': [supplier2, supplier1],
                                     'meetings': [meeting1]}
                                    , format='json')
        assert response.status_code == 400
