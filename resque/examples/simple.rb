$LOAD_PATH.unshift '/var/www/betlog/betlog/resque/lib'

require 'resque'
require 'archive'


#
# This is in our app ode
Archive.perform('22', Archive)
