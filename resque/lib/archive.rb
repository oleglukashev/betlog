# This is a simple Resque job.
require 'resque'

class Archive
  @queue = :simple

  def self.perform(repo_id, klass)
    Resque.enqueue(Archive, 22, 'master')
  end
end
