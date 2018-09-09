require 'spec_helper'
require 'lib/hash_ostruct'

describe CustomStruct do
  context 'hash to ostruct' do
    subject { {test: 'test', test1: ['test1', {test2: 'test2'}]}.to_ostruct('mypath') }

    it 'should have github link equals to path' do
      expect(subject.github_link).to eq 'mypath'
    end

    it 'should allow method syntax' do
      expect(subject.test).to eq 'test'
      expect(subject.test1.class.name).to eq 'Array'
      expect(subject.test1[1].class.name).to eq 'CustomStruct'
      expect(subject.test1[1].test2).to eq 'test2'
    end
  end

  context 'array to ostruct' do
    subject { ['a_test', {test: 'test', test1: ['test1', {test2: 'test2'}]}].to_ostruct('mypath') }

    it 'inner struct should have github link equals to path' do
      expect(subject[1].github_link).to eq 'mypath'
    end

    it 'should allow method syntax' do
      expect(subject[0]).to eq 'a_test'

      expect(subject[1].test).to eq 'test'
      expect(subject[1].test1.class.name).to eq 'Array'
      expect(subject[1].test1[1].class.name).to eq 'CustomStruct'
      expect(subject[1].test1[1].test2).to eq 'test2'
    end
  end
end