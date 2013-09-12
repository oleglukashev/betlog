#!/usr/local/bin/python3.3
# -*- coding: utf-8 -*-

import sqlalchemy
import yaml

from bets.Bet import Bet
from bets.MarathonBet import MarathonBet

links = yaml.load( open('config/links.yml', 'r') )

for key, value in links.iteritems():
  instance = eval( key.title() + "Bet" )
  instance = instance( value )
  instance.parse()