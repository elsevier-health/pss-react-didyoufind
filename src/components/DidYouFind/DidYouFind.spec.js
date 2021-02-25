import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import DidYouFind from './DidYouFind';

configure({adapter: new Adapter()});

describe("<DidYouFind />", () => {
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<DidYouFind />);
    });

    it("should have a 'dark' class in a darkMode props is passed in", () => {
        wrapper.setProps({
            darkMode: "true"
        });
        expect(wrapper.hasClass('dark')).toEqual(true);
    });

    it("should not have a 'dark' class no darkMode prop is passed in", () => {
        expect(wrapper.hasClass('dark')).toEqual(false);
    });

    it("should not have a 'dark' class if the darkMode prop is blank", () => {
        wrapper.setProps({
            darkMode: ""
        });
        expect(wrapper.hasClass('dark')).toEqual(false);
    });

    it("should not have a 'dark' class if the darkMode prop is false", () => {
        wrapper.setProps({
            darkMode: "false"
        });
        expect(wrapper.hasClass('dark')).toEqual(false);
    });

    it("should not have a 'dark' class if the darkMode prop is anything else than 'true'", () => {
        wrapper.setProps({
            darkMode: "darkMode"
        });
        expect(wrapper.hasClass('dark')).toEqual(false);
    });
});