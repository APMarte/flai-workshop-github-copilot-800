from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class UserAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            name='Tony Stark',
            email='tony@avengers.com',
            age=45,
            fitness_level='Advanced'
        )

    def test_get_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        data = {
            'name': 'Steve Rogers',
            'email': 'steve@avengers.com',
            'age': 105,
            'fitness_level': 'Advanced'
        }
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TeamAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.team = Team.objects.create(
            name='Team Marvel',
            members=['Tony Stark', 'Steve Rogers']
        )

    def test_get_teams(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_team(self):
        data = {
            'name': 'Team DC',
            'members': ['Clark Kent', 'Diana Prince']
        }
        response = self.client.post('/api/teams/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ActivityAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.activity = Activity.objects.create(
            user='Tony Stark',
            activity_type='Running',
            duration='30 minutes',
            date=date(2024, 1, 10)
        )

    def test_get_activities(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_activity(self):
        data = {
            'user': 'Thor Odinson',
            'activity_type': 'Hammer Training',
            'duration': '90 minutes',
            'date': '2024-01-14'
        }
        response = self.client.post('/api/activities/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LeaderboardAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.entry = Leaderboard.objects.create(user='Thor Odinson', score=950)

    def test_get_leaderboard(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_leaderboard_ordered_by_score(self):
        Leaderboard.objects.create(user='Steve Rogers', score=900)
        response = self.client.get('/api/leaderboard/')
        results = response.data
        if len(results) > 1:
            self.assertGreaterEqual(results[0]['score'], results[1]['score'])


class WorkoutAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.workout = Workout.objects.create(
            name='Iron Man Endurance',
            description='High-intensity cardio routine',
            duration='45 minutes',
            intensity='High'
        )

    def test_get_workouts(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_workout(self):
        data = {
            'name': 'Super Soldier Program',
            'description': 'Full body strength training',
            'duration': '60 minutes',
            'intensity': 'Very High'
        }
        response = self.client.post('/api/workouts/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class APIRootTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_root_redirects_to_api(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_root(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
