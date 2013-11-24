#!/usr/local/bin/python3.3
# -*- coding: utf-8 -*-
import logger
import datetime
import yaml
from datetime import date

import sqlalchemy
from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base
#from Bets import Bet
import urllib
import lxml.html
import lxml.cssselect
from Modules.Dictionary import Dictionary
from Modules import UsedChampionships


class BetcityBet():
  
  def __init__( self ):
    self.link = self.setConfigData()
    self.teams_not_found = {}
    self.current_sport = ""
    self.current_country = ""
    self.current_championship = ""

  def setConfigData( self ):
    bookmakers = yaml.load( open('parser/config/bookmakers.yml', 'r') )
    for key, value in bookmakers.items():
      if key == 'betcity':
        return value

  def getContentFromUrl( self ):
    page = urllib.request.urlopen( self.link['url'] )
    #page = urllib.request.urlopen( self.link['url'] )
    doc = lxml.html.document_fromstring(page.read())
    return doc


  def parse( self ):
    content = self.getContentFromUrl()
    
