#!/usr/local/bin/python3.3
# -*- coding: utf-8 -*-
import sqlalchemy
from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base
from Bet import Bet
import urllib
import lxml.html
import lxml.cssselect

class MarathonBet( Bet ):
  def __init__( self, link, databaseConnect ):
    self.databaseConnect = databaseConnect
    self.link = link

  def getContentFromUrl( self ):
    page = urllib.urlopen( self.link )
    doc = lxml.html.document_fromstring(page.read())

    return doc

  def parse( self ):
    content = self.getContentFromUrl()
    connect = self.databaseConnect

    s = Session( connect )

    for events in content.cssselect('#container_EVENTS > div.main-block-events'):
      print events.cssselect('div.block-events-head')[0].text.encode('utf-8').strip(" \r\n")

    
    
