import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ThankYou from './ThankYou';

configure({adapter: new Adapter()});

describe('<ThankYou />', () => {
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<ThankYou />);
    });

    it('should render a thank you message', () => {
        expect(wrapper.find('.didYouFindMessageSelector')).toHaveLength(1);
        expect(wrapper.find('.didYouFindMessageSelector').text()).toBe('Thanks for responding.');
    });

    it('should not have a "dark" class if the darkMode prop is missing', () => {
        expect(wrapper.hasClass('dark')).toEqual(false);
    });

    it('should have a "dark" class if the darkMode prop is true', () => {
        wrapper.setProps({
            darkMode: true
        });
        expect(wrapper.hasClass('dark')).toEqual(true);
    });

    it('should not have a "dark" class if the darkMode prop is false', () => {
        wrapper.setProps({
            darkMode: false
        });
        expect(wrapper.hasClass('dark')).toEqual(false);
    });
});