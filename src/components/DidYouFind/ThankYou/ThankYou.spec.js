import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ThankYou from './ThankYou';

configure({adapter: new Adapter()});

describe('<ThankYou />', () => {
    it('should render a thank you message', () => {
        const wrapper = shallow(<ThankYou />);
        expect(wrapper.find('.didYouFindMessageSelector')).toHaveLength(1);
        expect(wrapper.find('.didYouFindMessageSelector').text()).toBe('Thanks for responding.');
    });
});