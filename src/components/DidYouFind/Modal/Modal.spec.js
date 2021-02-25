import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from "axios";

import Modal from "./Modal";

configure({adapter: new Adapter()});

describe("<Modal />", () => {
    let wrapper, app;
    beforeEach(() => {
        app = document.createElement("div");
        document.body.appendChild(app);

        wrapper = mount(<Modal />, {attachTo: app});
        axios.put.mockResolvedValue({
            data: {}
        });
    });

    afterEach(() => {
        document.body.removeChild(app)
    });

    it("does not render the modal if the show property is missing", () => {
        expect(wrapper.find(".didyoufind-modal")).toHaveLength(0);
    });

    it("does not render the modal if the show property is false", () => {
        wrapper.setProps({show: false});
        expect(wrapper.find(".didyoufind-modal")).toHaveLength(0);
    });

    it("renders the modal if the show property is set to true", () => {
        wrapper.setProps({show: true});
        expect(wrapper.find(".didyoufind-modal")).toHaveLength(1);
    })

    it("does nothing when disabled submit button is clicked", () => {
        wrapper.setProps({
            show: true,
            onSubmitFeedback: (e) => {
                wrapper.setProps({show: false});
            },
        });
        expect(wrapper.find(".didyoufind-modal")).toHaveLength(1);
        expect(wrapper.find(".didYouFindModalSubmitBtnSelector")).toHaveLength(1);
        wrapper.find(".didYouFindModalSubmitBtnSelector").simulate("click");
        expect(wrapper.find(".didyoufind-modal")).toHaveLength(1);
        expect(axios.put).not.toHaveBeenCalledWith("/search/feedback");
    });

    it("submits feedback after text is entered and submit button is clicked", () => {
        wrapper.setProps({
            show: true,
            searchTerm: "searchTerm",
            documentId: "documentId",
            documentName: "documentName",
            documentUrl: "documentUrl",
            onSubmitFeedback: (e) => {
                wrapper.setProps({show: false});
            },
        });

        expect(wrapper.find(".didyoufind-modal")).toHaveLength(1);
        expect(wrapper.find(".didYouFindModalSubmitBtnSelector")).toHaveLength(1);
        expect(wrapper.find(".tellUsMoreTextAreaSelector")).toHaveLength(1);

        const feedback = "This is some awesome feedback about SDX search results!"
        const textarea = wrapper.find(".tellUsMoreTextAreaSelector");

        textarea.props().value = feedback;
        expect(textarea.props().value).toEqual(feedback);
        textarea.simulate("change", { value: feedback});
        textarea.update();

        textarea.simulate("keyup", { target: { value: feedback } });
        expect(textarea.props().value).toEqual(feedback);

        wrapper.find(".didYouFindModalSubmitBtnSelector").simulate("click");

        expect(axios.put).toHaveBeenCalledWith("/search/feedback", {
            searchTerm: wrapper.props().searchTerm,
            documentId: wrapper.props().documentId,
            documentName: wrapper.props().documentName,
            documentUrl: wrapper.props().documentUrl,
            // NOTE THIS ISN'T CORRECT BUT WE CAN'T CHANGE THE VALUE OF AN UNCONTROLLED TEXTAREA.
            feedback: ""
        });

        expect(wrapper.find(".didyoufind-modal")).toHaveLength(0);
    });

    it("closes the modal on X button click", () => {
        wrapper.setProps({
            show: true,
            onClose: (e) => {
                wrapper.setProps({show: false});
            }
        });
        expect(wrapper.find(".didyoufind-modal")).toHaveLength(1);
        expect(wrapper.find("button.didYouFindModalCloseBtn")).toHaveLength(1);
        wrapper.find("button.didYouFindModalCloseBtn").simulate("click");
        expect(wrapper.find(".didyoufind-modal")).toHaveLength(0);
    });

    describe("<Modal darkMode/>", () => {
        it('should not have a "dark" class if the darkMode prop is missing', () => {
            wrapper = shallow(<Modal show={true} />);
            expect(wrapper.hasClass('dark')).toEqual(false);
        });

        it('should have a "dark" class if the darkMode prop is true', () => {
            wrapper = shallow(<Modal darkMode={true} show={true} />);
            expect(wrapper.hasClass('dark')).toEqual(true);
        });

        it('should not have a "dark" class if the darkMode prop is false', () => {
            wrapper = shallow(<Modal darkMode={false} show={true} />);
            expect(wrapper.hasClass('dark')).toEqual(false);
        });
    });

});