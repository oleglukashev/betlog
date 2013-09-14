#!/usr/local/bin/python3.3
# -*- coding: utf-8 -*-
import sqlalchemy
from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base
#from Bets import Bet
import urllib
import lxml.html
import lxml.cssselect

class MarathonBet():

  def __init__( self, link, databaseConnect ):
    self.databaseConnect = databaseConnect
    self.link = link

  def getContentFromUrl( self ):
    data = urllib.parse.urlencode( self.link['data'] )

    page = urllib.request.urlopen( self.link['url'], data.encode('utf-8') )
    doc = lxml.html.document_fromstring(page.read().decode('utf-8'))
    
    return doc

  def parse( self ):
    content = self.getContentFromUrl()
    connect = self.databaseConnect

    s = Session( connect )

    for event in content.cssselect('#container_EVENTS > div.main-block-events'):
      event_title_elems = event.cssselect('div.block-events-head > *')

      for event_title_elem in event_title_elems:
        event_title_elem.drop_tree()

      print( event.cssselect('div.block-events-head')[0].text.strip(" \r\n") )

    
    
