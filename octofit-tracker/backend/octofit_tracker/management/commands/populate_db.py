from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Cleared existing data.')

        # Create Users (superheroes)
        users = [
            User(name='Tony Stark', email='tony@avengers.com', age=45, fitness_level='Advanced'),
            User(name='Steve Rogers', email='steve@avengers.com', age=105, fitness_level='Advanced'),
            User(name='Natasha Romanoff', email='natasha@avengers.com', age=38, fitness_level='Advanced'),
            User(name='Bruce Banner', email='bruce@avengers.com', age=49, fitness_level='Intermediate'),
            User(name='Thor Odinson', email='thor@avengers.com', age=1500, fitness_level='Advanced'),
            User(name='Clark Kent', email='clark@dcheroes.com', age=35, fitness_level='Advanced'),
            User(name='Diana Prince', email='diana@dcheroes.com', age=800, fitness_level='Advanced'),
            User(name='Barry Allen', email='barry@dcheroes.com', age=28, fitness_level='Advanced'),
            User(name='Bruce Wayne', email='bruce@dcheroes.com', age=40, fitness_level='Advanced'),
            User(name='Arthur Curry', email='arthur@dcheroes.com', age=38, fitness_level='Advanced'),
        ]
        for user in users:
            user.save()
        self.stdout.write(f'Created {len(users)} users.')

        # Create Teams
        marvel_members = list(User.objects.filter(email__contains='avengers.com').values_list('name', flat=True))
        dc_members = list(User.objects.filter(email__contains='dcheroes.com').values_list('name', flat=True))

        team_marvel = Team(name='Team Marvel', members=marvel_members)
        team_marvel.save()
        team_dc = Team(name='Team DC', members=dc_members)
        team_dc.save()
        self.stdout.write('Created 2 teams.')

        # Create Activities
        activities = [
            Activity(user='Tony Stark', activity_type='Running', duration='30 minutes', date=date(2024, 1, 10)),
            Activity(user='Steve Rogers', activity_type='Weight Training', duration='60 minutes', date=date(2024, 1, 11)),
            Activity(user='Natasha Romanoff', activity_type='Martial Arts', duration='45 minutes', date=date(2024, 1, 12)),
            Activity(user='Bruce Banner', activity_type='Yoga', duration='30 minutes', date=date(2024, 1, 13)),
            Activity(user='Thor Odinson', activity_type='Hammer Training', duration='90 minutes', date=date(2024, 1, 14)),
            Activity(user='Clark Kent', activity_type='Flying', duration='60 minutes', date=date(2024, 1, 10)),
            Activity(user='Diana Prince', activity_type='Combat Training', duration='75 minutes', date=date(2024, 1, 11)),
            Activity(user='Barry Allen', activity_type='Sprinting', duration='15 minutes', date=date(2024, 1, 12)),
            Activity(user='Bruce Wayne', activity_type='Martial Arts', duration='60 minutes', date=date(2024, 1, 13)),
            Activity(user='Arthur Curry', activity_type='Swimming', duration='45 minutes', date=date(2024, 1, 14)),
        ]
        for activity in activities:
            activity.save()
        self.stdout.write(f'Created {len(activities)} activities.')

        # Create Leaderboard
        leaderboard_entries = [
            Leaderboard(user='Thor Odinson', score=950),
            Leaderboard(user='Steve Rogers', score=900),
            Leaderboard(user='Diana Prince', score=875),
            Leaderboard(user='Clark Kent', score=850),
            Leaderboard(user='Natasha Romanoff', score=820),
            Leaderboard(user='Bruce Wayne', score=800),
            Leaderboard(user='Tony Stark', score=780),
            Leaderboard(user='Barry Allen', score=750),
            Leaderboard(user='Arthur Curry', score=720),
            Leaderboard(user='Bruce Banner', score=600),
        ]
        for entry in leaderboard_entries:
            entry.save()
        self.stdout.write(f'Created {len(leaderboard_entries)} leaderboard entries.')

        # Create Workouts
        workouts = [
            Workout(name='Iron Man Endurance', description='High-intensity cardio routine inspired by Tony Stark', duration='45 minutes', intensity='High'),
            Workout(name='Super Soldier Program', description='Full body strength training like Steve Rogers', duration='60 minutes', intensity='Very High'),
            Workout(name='Black Widow Circuit', description='Combat and agility circuit training', duration='40 minutes', intensity='High'),
            Workout(name='Asgardian Strength', description='Heavy compound lifts for godly strength', duration='75 minutes', intensity='Very High'),
            Workout(name='Amazon Warrior', description='Strength and combat training inspired by Wonder Woman', duration='60 minutes', intensity='High'),
            Workout(name='Speedster Intervals', description='Ultra-fast interval sprints', duration='20 minutes', intensity='Extreme'),
            Workout(name='Dark Knight Training', description='Balanced martial arts and strength conditioning', duration='90 minutes', intensity='High'),
            Workout(name='Aquatic Power', description='Swimming and underwater resistance training', duration='50 minutes', intensity='Moderate'),
        ]
        for workout in workouts:
            workout.save()
        self.stdout.write(f'Created {len(workouts)} workouts.')

        self.stdout.write(self.style.SUCCESS('Successfully populated the octofit_db database!'))
