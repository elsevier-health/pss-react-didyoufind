import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ThankYouNo from './ThankYouNo';
import Modal from '../Modal/Modal';

configure({adapter: new Adapter()});

describe('<ThankYouNo />', () => {
    it('should render a modal component', () => {
        const wrapper = shallow(<ThankYouNo />);
        expect(wrapper.find(Modal)).toHaveLength(1);
    });
});