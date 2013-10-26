#!/usr/local/bin/python3.3
# -*- coding: utf-8 -*-
import logger

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

class MarathonBet():

  def __init__( self, link ):
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

    result = {}
    i = 0

    for event in content.cssselect('#container_EVENTS > div.main-block-events'):

      event_title_elems = event.cssselect('div.block-events-head > *')
      for event_title_elem in event_title_elems:
        event_title_elem.drop_tree()

      title_str = event.cssselect('div.block-events-head')[0].text.strip(" \r\n")

      if ( self.skipOrNotTitleByWord( title_str ) == False ):
        sport = self.getSportFromTitle( title_str )
        country = self.getCountryFromTitle( title_str )
        championship = self.getChampionshipFromTitle( title_str )

        if ( country == None ):
          country = UsedChampionships.findCountryByChampionship( championship )

        file = open("display.txt", "a",encoding='utf-8')

        if ( UsedChampionships.findSport( sport ) is not None ):
          if ( UsedChampionships.findCountryBySport( country, sport ) is not None ):
            if ( UsedChampionships.findChampionshipBySport( championship, sport ) is not None ):
              result[i] = self.getEventCoefficientFromDom( event )
              result[i]['championship'] = UsedChampionships.findChampionshipBySport( championship, sport )
              result[i]['country'] = UsedChampionships.findCountryBySport( country, sport )
              result[i]['sport'] = UsedChampionships.findSport( sport )

              i += 1
            else:
              file.write( title_str + " - не найден Чемпионат\r\n")
          else:
            file.write( title_str + " - не найдена Страна\r\n")
        else:
          file.write( title_str + " - не найдне Спорт\r\n")

    file.close()

    return result




  def getEventCoefficientFromDom( self, event_dom ):
    result = {}

    for event_item in event_dom.cssselect('table.foot-market > tbody'):
      title_teams_dom = event_item.cssselect('tr.event-header > td.first table tr td.name span.command div.member-name')

      if ( len( title_teams_dom ) ):
        coefficients_title_dom = event_dom.cssselect('table.foot-market > tr')[0]
        coefficients_dom = coefficients_title_dom.cssselect('th.coupone')

        if ( title_teams_dom[0] in title_teams_dom ):
          team1 = title_teams_dom[0]
          if ( self.getTeam( team1.text.strip(" \r\n") ) is not None ):
            result['first_team'] = self.getTeam( team1.text.strip(" \r\n") )

        if ( title_teams_dom[1] in title_teams_dom ):
          team2 = title_teams_dom[1]
          if ( self.getTeam( team2.text.strip(" \r\n") ) is not None ):
            result['second_team'] = self.getTeam( team2.text.strip(" \r\n") )


        if ( len( coefficients_dom ) > 0 ):
          result[self.getCoefficientTitleFromHtml( event_dom, 0)] = self.getCoefficientFromHtml( event_item, 0)

        if ( len( coefficients_dom ) >= 2 ):
          result[self.getCoefficientTitleFromHtml( event_dom, 1)] = self.getCoefficientFromHtml( event_item, 1)

        if ( len( coefficients_dom ) >= 3 ):
          result[self.getCoefficientTitleFromHtml( event_dom, 2)] = self.getCoefficientFromHtml( event_item, 2)

        if ( len( coefficients_dom ) >= 4 ):
          result[self.getCoefficientTitleFromHtml( event_dom, 3)] = self.getCoefficientFromHtml( event_item, 3)

        if ( len( coefficients_dom ) >= 5 ):
          result[self.getCoefficientTitleFromHtml( event_dom, 4)] = self.getCoefficientFromHtml( event_item, 4)

        if ( len( coefficients_dom ) >= 6 ):
          result[self.getCoefficientTitleFromHtml( event_dom, 5)] = self.getCoefficientFromHtml( event_item, 5)

        if ( len( coefficients_dom ) >= 7 ):
          result[self.getCoefficientTitleFromHtml( event_dom, 6)] = self.getCoefficientFromHtml( event_item, 6)

        if ( len( coefficients_dom ) >= 8 ):
          result[self.getCoefficientTitleFromHtml( event_dom, 7)] = self.getCoefficientFromHtml( event_item, 7)

        if ( len( coefficients_dom ) >= 9 ):
          result[self.getCoefficientTitleFromHtml( event_dom, 8)] = self.getCoefficientFromHtml( event_item, 8)

        if ( len( coefficients_dom ) >= 10 ):
          result[self.getCoefficientTitleFromHtml( event_dom, 9)] = self.getCoefficientFromHtml( event_item, 9)

    return result


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

  def getCoefficientFromHtml( self, container, position ):
    container = container.cssselect('tr.event-header > td')[position]
    return container.cssselect('span')[0].text.strip(" \r\n")

  def getCoefficientTitleFromHtml( self, container, position ):
    coefficients_type_association = {
      '1' : 'first',
      'X' : 'draw',
      '2' : 'second',
      '1X' : 'first_or_draw',
      '12' : 'first_or_second',
      'X2' : 'draw_or_second',
      'Фора1' : 'first_fora',
      'Фора2' : 'second_fora',
      'Тотал мен.' : 'total_less',
      'Тотал бол.' : 'total_more',
    }

    tr_dom = container.cssselect('table.foot-market > tr')[0]
    th_dom = tr_dom.cssselect('th.coupone')[position]
    a_dom = th_dom.cssselect('a')

    if ( len( a_dom ) ):
      key = a_dom[0].text_content().strip(" \r\n")
    else:
      return None

    if key in coefficients_type_association.keys():
      return coefficients_type_association[ key ]
    else:
      return None


  def skipOrNotTitleByWord( self, title ):
    ignore_words = ['Итоги', 'Женщины']

    for item in ignore_words:
      if ( title.find( item ) != -1 ):
        return True

    return False
