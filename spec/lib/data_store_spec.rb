require 'spec_helper'
require 'lib/data_store'
require 'lib/hash_ostruct'

describe DataStore do
  context 'data folder' do
    subject { DataStore.new("#{File.expand_path(File.dirname(__FILE__))}/data") }

    it 'should load the data dir' do
      expect(subject.class.name).to eq 'DataStore'
    end

    it 'should flatten' do
      expect(subject.flatten.size).to eq 4
      expect(subject.sub_data.flatten.size).to eq 2
    end

    it 'should access data' do
      expect(subject.config.class.name).to eq 'DataStoreFile'
      expect(subject.config.name).to eq 'test'
      expect(subject.config.types.class.name).to eq 'Array'
      expect(subject.config.types[0]).to eq 'test1'


      expect(subject.sub_data.class.name).to eq 'DataStore'
      expect(subject.sub_data.config.class.name).to eq 'DataStoreFile'
      expect(subject.sub_data.config.name).to eq 'test'
      expect(subject.sub_data.config.types.class.name).to eq 'Array'
      expect(subject.sub_data.config.types[0]).to eq 'test1'

      expect(subject.sub_data1.class.name).to eq 'DataStore'
      expect(subject.sub_data1.config.class.name).to eq 'DataStoreFile'
      expect(subject.sub_data1.config.name).to eq 'test'
      expect(subject.sub_data1.config.types.class.name).to eq 'Array'
      expect(subject.sub_data1.config.types[0]).to eq 'test1'
    end

    it 'should access parent folder' do
      expect(subject.sub_data.sub_data1.parent.base_file_name).to eq 'sub_data'
    end

    it 'should have name and path' do
      expect(subject.sub_data.base_file_name).to eq 'sub_data'
      expect(subject.sub_data.current_path).to eq "#{File.expand_path(File.dirname(__FILE__))}/data/sub_data"
    end
  end

  context 'data file' do
    subject { DataStore.new("#{File.expand_path(File.dirname(__FILE__))}/data") }

    it 'should access parent folder' do
      subject.load_dir

      expect(subject.sub_data.config.parent.class.name).to eq 'DataStore'
      expect(subject.sub_data.config.parent.base_file_name).to eq 'sub_data'
    end

    it 'should have file_name, base_file_name and path' do
      expect(subject.sub_data.config.base_file_name).to eq 'config'
      expect(subject.sub_data.config.file_name).to eq '1-config.yml'
      expect(subject.sub_data.config.path).to eq "#{File.expand_path(File.dirname(__FILE__))}/data/sub_data/1-config.yml"
    end
  end
end