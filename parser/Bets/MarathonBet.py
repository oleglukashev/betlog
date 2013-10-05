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
from Modules import Dictionary
from Modules import UsedChampionships

class MarathonBet():

  def __init__( self, link, databaseConnect ):
    self.databaseConnect = databaseConnect
    self.link = link


  def getContentFromUrl( self ):
    data = urllib.parse.urlencode( self.link['data'] )

    page = urllib.request.urlopen( self.link['url'], data.encode('utf-8') )

    #page = urllib.request.urlopen( self.link['url'] )
    doc = lxml.html.document_fromstring(page.read().decode('utf-8'))
    
    return doc


  def parse( self ):
    content = self.getContentFromUrl()
    print("--- Content has loaded ---")
    
    connect = self.databaseConnect

    s = Session( connect )

    for event in content.cssselect('#container_EVENTS > div.main-block-events'):
      event_title_elems = event.cssselect('div.block-events-head > *')

      for event_title_elem in event_title_elems:
        event_title_elem.drop_tree()

      title_str = event.cssselect('div.block-events-head')[0].text.strip(" \r\n")

      sport = self.getSportFromTitle( title_str )
      country = self.getCountryFromTitle( title_str )
      championship = self.getChampionshipFromTitle( title_str )
      
      if ( country == None ):
        country = UsedChampionships.findCountryByChampionship( championship )
      
      file = open("display.txt", "a",encoding='utf-8')

      if ( UsedChampionships.findSport( sport ) != None ):
        if ( UsedChampionships.findCountryBySport( country, sport ) != None ):
          if ( UsedChampionships.findChampionshipBySport( championship, sport ) != None ):
            #file.write( str( UsedChampionships.findSport( sport ) ) + "\r\n")
            #file.write( str( UsedChampionships.findCountryBySport( country, sport ) ) + "\r\n")
            #file.write( str( UsedChampionships.findChampionshipBySport( championship, sport ) ) + "\r\n")
            #file.write( "-------------------" + "\r\n\r\n")

            for event_item in event.cssselect('table.foot-market > tbody[id]'):
              if ( len( event_item.cssselect('tr.event-header td.first table tr td.name span.command div.member-name') ) ):
                if ( country != None ):
                  for team in event_item.cssselect('tr.event-header td.first table tr td.name span.command div.member-name'):
                    a = 6
                    #if ( self.getTeam( team.text.strip(" \r\n") ) == None ):

              if ( len( event_item.cssselect('tr.event-header > td')[1] ) ):
                first_win_container = event_item.cssselect('tr.event-header > td')[1]
                first_win = first_win_container.cssselect('span')[0].text.strip(" \r\n")

              if ( len( event_item.cssselect('tr.event-header > td')[2] ) ):
                evenly_container = event_item.cssselect('tr.event-header > td')[2]
                evenly = evenly_container.cssselect('span')[0].text.strip(" \r\n")

              if ( len( event_item.cssselect('tr.event-header > td')[3] ) ):
                second_win_container = event_item.cssselect('tr.event-header > td')[3]
                second_win = second_win_container.cssselect('span')[0].text.strip(" \r\n")

              if ( len( event_item.cssselect('tr.event-header > td')[4] ) ):
                first_win_or_evenly_container = event_item.cssselect('tr.event-header > td')[4]
                first_win_or_evenly = first_win_or_evenly_container.cssselect('span')[0].text.strip(" \r\n")

              if ( len( event_item.cssselect('tr.event-header > td')[5] ) ):
                first_or_second_win_container = event_item.cssselect('tr.event-header > td')[5]
                first_or_second_win = first_or_second_win_container.cssselect('span')[0].text.strip(" \r\n")

              if ( len( event_item.cssselect('tr.event-header > td')[6] ) ):
                second_win_or_evenly_container = event_item.cssselect('tr.event-header > td')[6]
                second_win_or_evenly = second_win_or_evenly_container.cssselect('span')[0].text.strip(" \r\n")

              if ( len( event_item.cssselect('tr.event-header > td')[7] ) ):
                fora_first_container = event_item.cssselect('tr.event-header > td')[7]
                fora_first = fora_first_container.cssselect('span')[0].text.strip(" \r\n")

              if ( len( event_item.cssselect('tr.event-header > td')[8] ) ):
                fora_second_container = event_item.cssselect('tr.event-header > td')[8]
                fora_second = fora_second_container.cssselect('span')[0].text.strip(" \r\n")

              if ( len( event_item.cssselect('tr.event-header > td')[9] ) ):
                total_less_container = event_item.cssselect('tr.event-header > td')[9]
                total_less = total_less_container.cssselect('span')[0].text.strip(" \r\n")

              if ( len( event_item.cssselect('tr.event-header > td')[10] ) ):
                total_more_container = event_item.cssselect('tr.event-header > td')[10]
                total_more = total_more_container.cssselect('span')[0].text.strip(" \r\n")
          else:
            file.write( title_str + "Чемпионат\r\n")
        else:
          file.write( title_str + "Страна\r\n") 
      else:
        file.write( title_str + "Спорт\r\n")

    file.close()
             
            


  def getSportFromTitle( self, title ):
    title_array = title.split(". ")

    for title_element in title_array:
      if Dictionary.findSport( title_element ):
        return Dictionary.findSport( title_element )

  def getChampionshipFromTitle( self, title ):
    title_array = title.split(". ")

    for title_element in title_array:
      if Dictionary.findChampionship( title_element ):
        return Dictionary.findChampionship( title_element )

  def getCountryFromTitle( self, title ):
    title_array = title.split(". ")

    for title_element in title_array:
      if Dictionary.findCountry( title_element ):
        return Dictionary.findCountry( title_element )

  def getTeam( self, team ):
    if Dictionary.findTeam( team ):
      return Dictionary.findTeam( team )


    
    
