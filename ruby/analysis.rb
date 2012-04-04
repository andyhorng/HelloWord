require 'stemmify'

class Analysis
  def initialize(file)
    @roots = Hash.new {|h,k| h[k]=Array.new }
    @file = file
  end

  def analysis
    # collects words
    words = @file.lines("./sample.txt").collect do |line|
      line.scan(/[a-zA-Z\-_]{3,}+/)
    end
    words.flatten.each {|w| @roots[w.downcase.stem] << w}
    return @roots
  end
end

File.open("./sample2.txt") do |file|
  analysiser = Analysis.new(file)
  require 'pp'
  pp analysiser.analysis
end
