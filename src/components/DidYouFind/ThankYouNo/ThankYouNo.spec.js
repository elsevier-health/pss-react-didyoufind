import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ThankYouNo from './ThankYouNo';
import Modal from '../Modal/Modal';

configure({adapter: new Adapter()});

describe('<ThankYouNo />', () => {
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<ThankYouNo />);
    });

    it('should render a modal component', () => {
        expect(wrapper.find(Modal)).toHaveLength(1);
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