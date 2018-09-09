module Middleman
  module Sitemap
    module Extensions
      class OnDisk < Extension
        def update_files(updated_files, removed_files)
          return if (updated_files + removed_files).all?(&method(:ignored?))

          # Rebuild the sitemap any time a file is touched
          # in case one of the other manipulators
          # (like asset_hash) cares about the contents of this file,
          # whether or not it belongs in the sitemap (like a partial)
          #@app.sitemap.rebuild_resource_list!(:touched_file)

          # Force sitemap rebuild so the next request is ready to go.
          # Skip this during build because the builder will control sitemap refresh.
          #@app.sitemap.ensure_resource_list_updated! unless @waiting_for_ready || @app.build?
        end
      end
    end
  end
end

module Middleman
  class SourceWatcher
    def update(updated_paths, removed_paths)
      valid_updates = updated_paths
                          .map { |p| @files[p] || path_to_source_file(p, @directory, @type, @options[:destination_dir]) }
                          .select(&method(:valid?))

      valid_updates.each do |f|
        record_file_change(f)
        logger.debug "== Change (#{f[:types].inspect}): #{f[:relative_path]}"
      end

      #related_sources = valid_updates.map { |u| u[:full_path] } + removed_paths
      #related_updates = ::Middleman::Util.find_related_files(app, related_sources).select(&method(:valid?))

      #related_updates.each do |f|
      #  logger.debug "== Possible Change (#{f[:types].inspect}): #{f[:relative_path]}"
      #end

      #valid_updates |= related_updates

      valid_removes = removed_paths
                          .select(&@files.method(:key?))
                          .map(&@files.method(:[]))
                          .select(&method(:valid?))
                          .each do |f|
        remove_file_from_cache(f)
        logger.debug "== Deletion (#{f[:types].inspect}): #{f[:relative_path]}"
      end

      unless valid_updates.empty? && valid_removes.empty?
        execute_callbacks(:on_change, [
            valid_updates,
            valid_removes,
            self
        ])
      end

      [valid_updates, valid_removes]
    end
  end
end