window_x = 100
window_y = 45

import sys
import pygame

from pygame._sdl2 import Window

window = Window.from_display_module()
window.position = (window_x, window_y)

pygame.init()

from random import randint

import time

WIDTH = 800

HEIGHT = 600

balloon = Actor("balloon")
balloon.pos = 400, 300

bird = Actor("bird-up")
bird.pos = randint(800, 1600), randint(10, 200)

house = Actor("house")
house.pos = randint(800, 1600), 460

tree = Actor("tree")
tree.pos = randint(800, 1600), 450

bird_up = True
up = False
game_over = False
lives = 3
bird_speed = 2
house_speed = 1
tree_speed = 1
score = 0
number_of_updates = 0

scores = []

def update_high_scores ():
    global score, scores
    try:
        filename = r"C:/Users/jaciz/py-projects/balloon-fight/high-score.txt"
        scores = []
        new_high_score = False
        with open(filename, "r") as file:
            line = file.readline()
            high_scores = line.split()
            for high_score in high_scores:
                if (score > int(high_score)):
                    new_high_score = True
                    scores.append(str(score) + " ")
                    score = int(high_score)
                else:
                    scores.append(str(score) + " ")
    except FileNotFoundError:
        sys.exit()
    
    if new_high_score:
        with open(filename, "w") as file:
            for high_score in scores:
                file.write(high_score)

def display_high_scores ():
    screen.draw.text("HIGH SCORES", (350, 150), color = "black")
    y = 175
    position = 1
    for high_score in scores:
        screen.draw.text(str(position) + ". " + high_score, (350, y), color = "black")
        y += 25
        position += 1
        
def draw ():
    screen.blit("background", (0, 0))
    if not game_over:
        balloon.draw()
        bird.draw()
        house.draw()
        tree.draw()
        screen.draw.text("Lives: " + str(lives), (10, 10), color = "black")
        screen.draw.text("Score: " + str(score), (700, 5), color = "black")
    else:
        display_high_scores()

def on_mouse_down (pos):
    global up
    up = True
    balloon.y -= 50

def on_mouse_up ():
    global up
    up = False
    
def flap ():
    global bird_up
    if bird_up:
        bird.image = "bird-down"
        bird_up = False
    else:
        bird.image = "bird-up"
        bird_up = True

def update ():
    global game_over, score, number_of_updates, lives, bird_speed, house_speed, tree_speed
    if not game_over:
        if not up:
            balloon.y += 1
        
        if bird.x > 0:
            bird.x -= bird_speed * 2
            if number_of_updates == round(18 / bird_speed):
                flap()
                number_of_updates = 0
            else:
                number_of_updates += 1
        else:
            bird.x = randint(800, 1600)
            bird.y = randint(10, 200)
            score += 1
            number_of_updates = 0
            if score % 10 == 0:
                bird_speed += 1
        
        if house.right > 0:
            house.x -= house_speed * 2
        else:
            house.x = randint(800, 1600)
            score += 1
            if score % 10 == 0:
                house_speed += 1
        
        if tree.right > 0:
            tree.x -= tree_speed * 2
        else: 
            tree.x = randint(800, 1600)
            score += 1
            if score % 10 == 0:
                tree_speed += 1
        
        if balloon.collidepoint(bird.x, bird.y) or \
            balloon.collidepoint(house.x, house.y) or \
                balloon.collidepoint(tree.x, tree.y):
                    time.sleep(1)
                    lives -= 1
                    balloon.x = 400
                    balloon.y = 300
                    if lives == 0:
                        game_over = True
                        update_high_scores()
        elif balloon.top < 0 or balloon.bottom > 560:
            game_over = True
            update_high_scores()  