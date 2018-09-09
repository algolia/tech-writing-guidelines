module SvgHelper
  def inline_svg(path, message=nil)
    @svg ||= {}

    return @svg[path] if @svg[path]

    if File.exist?("assets/images/#{path}")
      full_path = "assets/images/#{path}"

      @svg[path] = File.open(full_path, "rb") do |file|
        file.read
      end
    else
      message = "Could not find SVG file @ #{path}" if message.nil?
      if config[:stage] == 'develop'
        p(message)
      else
        raise message
      end
    end

    @svg[path]
  end
end

