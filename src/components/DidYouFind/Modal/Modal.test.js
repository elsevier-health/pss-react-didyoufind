/**
 * @jest-environment jsdom
 */

import "babel-polyfill";
import React from "react";
import {render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import logger from "../logger";

jest.mock("../logger");

import Modal from "./Modal";

let longFeedback = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sagittis faucibus tempus. Etiam finibus finibus diam, et tempus nibh viverra aliquam. Phasellus nec aliquam diam. Donec turpis est, lobortis ut leo ut, mollis pharetra ante. Morbi venenatis tincidunt sapien. Curabitur bibendum est vel massa pharetra, in interdum lectus rhoncus. In sit amet est ipsum. Morbi scelerisque mollis dui non sollicitudin. Quisque vitae imperdiet est. Proin iaculis tempor felis, ut vulputate ante pellentesque sed. Donec arcu purus, semper eget risus a, rutrum accumsan orci. Maecenas turpis lacus, facilisis in tincidunt quis, tincidunt ut felis. Fusce id convallis purus, ut ultricies mi. Donec at condimentum risus. Etiam id est at lectus ornare tincidunt.\n' +
    '\n' +
    'Pellentesque gravida ipsum eget turpis accumsan tincidunt at vitae erat. Aenean porta purus et metus porttitor lacinia. Morbi vehicula pellentesque pretium. Sed ac neque mi. Praesent malesuada ultricies turpis, et bibendum dolor feugiat et. Morbi molestie eleifend turpis, id hendrerit urna. Praesent euismod pellentesque mi ac dignissim. Phasellus nec scelerisque augue, ut ullamcorper erat. Nullam pharetra scelerisque aliquet. Integer auctor lorem malesuada magna vulputate elementum. Quisque dapibus ante lacinia malesuada feugiat. Suspendisse potenti. Vivamus vulputate sed tellus a placerat. Nulla nisl urna, tempus quis tortor nec, iaculis dignissim purus.\n' +
    '\n' +
    'Vestibulum nec lacus sit amet felis mollis mattis. Donec sed tristique mauris. Phasellus consequat risus nunc, ac venenatis enim rhoncus quis. Aenean et odio sed nulla congue placerat. Mauris id nunc libero. Cras faucibus eu urna tempor mollis. Vestibulum et risus tincidunt, cursus mi et, vestibulum ipsum. In hac habitasse platea dictumst. In elementum odio.' +
    '\n' +
    'Pellentesque gravida ipsum eget turpis accumsan tincidunt at vitae erat. Aenean porta purus et metus porttitor lacinia. Morbi vehicula pellentesque pretium. Sed ac neque mi. Praesent malesuada ultricies turpis, et bibendum dolor feugiat et. Morbi molestie eleifend turpis, id hendrerit urna. Praesent euismod pellentesque mi ac dignissim. Phasellus nec scelerisque augue, ut ullamcorper erat. Nullam pharetra scelerisque aliquet. Integer auctor lorem malesuada magna vulputate elementum. Quisque dapibus ante lacinia malesuada feugiat. Suspendisse potenti. Vivamus vulputate sed tellus a placerat. Nulla nisl urna, tempus quis tortor nec, iaculis dignissim purus.\n' +
    '\n' +
    'Vestibulum nec lacus sit amet felis mollis mattis. Donec sed tristique mauris. Phasellus consequat risus nunc, ac venenatis enim rhoncus quis. Aenean et odio sed nulla congue placerat. Mauris id nunc libero. Cras faucibus eu urna tempor mollis. Vestibulum et risus tincidunt, cursus mi et, vestibulum ipsum. In hac habitasse platea dictumst. In elementum odio.';

const feedback = "This is some awesome feedback about SDX search results!"

const props = {
    show: true,
    searchTerm: "searchTerm",
    documentId: "documentId",
    documentName: "documentName",
    documentUrl: "documentUrl",
    onSubmitFeedback: jest.fn()
};

const user = userEvent.setup();
Object.assign(window, {
    clipboardData: {
        getData: jest.fn().mockImplementation((key) => {
            return longFeedback;
        })
    },
});

const typeText = async (text) => {
    return user.type(screen.getByRole('textbox'), text);
};

const clickTextBox = async () => {
    return user.click(screen.getByRole('textbox'));
};

const pasteText = async (text) => {
    return user.paste(text);
};

const verifyHighlight = async () => {
    expect(screen.queryByTestId('highlight')).not.toBeNull();
};

const verifySubmitButton = (isDisabled) => {
    const submitBtn = screen.getByTestId('qa-didyoufind-submit-btn');
    expect(submitBtn).not.toBeNull();
    if (isDisabled) {
        expect(submitBtn.getAttribute('disabled')).not.toBeNull();
    } else {
        expect(submitBtn.getAttribute('disabled')).toBeNull();
    }
};

const clickSubmitButton = async () => {
    return user.click(screen.getByTestId('qa-didyoufind-submit-btn'));
};

const renderAndVerifyModal = (modalProps, isDisplayed) => {
    render(<Modal {...modalProps} />);
    const modal = screen.queryByTestId('qa-didyoufind-modal');

    if(isDisplayed) {
        expect(modal).not.toBeNull();
        expect(screen.getByText('Submit')).not.toBeNull();
    } else {
        expect(modal).toBeNull();
    }
};

describe("<Modal />", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('logs an error to the console if submit feedback ajax fails', async () => {
        axios.put.mockRejectedValueOnce('error');
        renderAndVerifyModal(props, true);

        verifySubmitButton(true);

        await typeText(feedback);

        verifySubmitButton(false);

        await clickSubmitButton();

        expect(axios.put).toHaveBeenCalledWith("/search/feedback", {
            searchTerm: props.searchTerm,
            documentId: props.documentId,
            documentName: props.documentName,
            documentUrl: props.documentUrl,
            feedback: feedback
        });
        expect(props.onSubmitFeedback).toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalledWith('Error error');
    });

    beforeEach(() => {
        axios.put.mockResolvedValue({ data: {} });
    });

    it("does not render the modal if the show property is missing", () => {
        renderAndVerifyModal({}, false);
    });

    it("does not render the modal if the show property is false", () => {
        renderAndVerifyModal({
            show: false
        }, false);
    });

    it("renders the modal if the show property is set to true", () => {
        renderAndVerifyModal({
            show: true
        }, true);
    });

    it("does nothing when disabled submit button is clicked", async () => {
        const onSubmitFeedback = jest.fn();

        renderAndVerifyModal({
            show: true,
            onSubmitFeedback: onSubmitFeedback
        }, true);

        verifySubmitButton(true);

        await clickSubmitButton();

        expect(onSubmitFeedback).not.toHaveBeenCalled();
        expect(axios.put).not.toHaveBeenCalled();
    });

    it("submits feedback after text is entered and submit button is clicked", async () => {
        renderAndVerifyModal(props, true);

        verifySubmitButton(true);

        await typeText(feedback);

        verifySubmitButton(false);

        await clickSubmitButton();

        expect(axios.put).toHaveBeenCalledWith("/search/feedback", {
            searchTerm: props.searchTerm,
            documentId: props.documentId,
            documentName: props.documentName,
            documentUrl: props.documentUrl,
            feedback: feedback
        });
        expect(props.onSubmitFeedback).toHaveBeenCalled();
        expect(logger.log).toHaveBeenCalledWith('success');
    });

    it('highlights text over the character limit and disables the button', async () => {
        renderAndVerifyModal(props, true);

        verifySubmitButton(true);

        await typeText(longFeedback);

        verifySubmitButton(true);

        await verifyHighlight();

        await clickSubmitButton();

        expect(props.onSubmitFeedback).not.toHaveBeenCalled();
        expect(axios.put).not.toHaveBeenCalledWith("/search/feedback", {
            searchTerm: props.searchTerm,
            documentId: props.documentId,
            documentName: props.documentName,
            documentUrl: props.documentUrl,
            feedback: longFeedback
        });
    }, 15000);

    it('highlights text over the character limit when it is pasted into the text area', async () => {
        renderAndVerifyModal(props, true);

        verifySubmitButton(true);

        await clickTextBox();

        await pasteText(longFeedback);

        verifySubmitButton(true);

        await verifyHighlight();

        await clickSubmitButton();

        expect(props.onSubmitFeedback).not.toHaveBeenCalled();
        expect(axios.put).not.toHaveBeenCalledWith("/search/feedback", {
            searchTerm: props.searchTerm,
            documentId: props.documentId,
            documentName: props.documentName,
            documentUrl: props.documentUrl,
            feedback: longFeedback
        });
    }, 15000);

    it('pastes data saved in the window clipboard', async () => {
        renderAndVerifyModal(props, true);

        verifySubmitButton(true);

        await clickTextBox();
        fireEvent.paste(screen.getByRole('textbox'));
        expect(window.clipboardData.getData).toHaveBeenCalledWith('text');

        verifySubmitButton(true);

        await verifyHighlight();

        await clickSubmitButton();

        expect(props.onSubmitFeedback).not.toHaveBeenCalled();
        expect(axios.put).not.toHaveBeenCalledWith("/search/feedback", {
            searchTerm: props.searchTerm,
            documentId: props.documentId,
            documentName: props.documentName,
            documentUrl: props.documentUrl,
            feedback: longFeedback
        });
    }, 15000);

    it('highlights text over the character limit when it is pasted into the text area', async () => {
        renderAndVerifyModal(props, true);

        verifySubmitButton(true);

        await clickTextBox();
        await pasteText(longFeedback);

        verifySubmitButton(true);

        await verifyHighlight();

        const textArea = screen.getByRole('textbox');
        const readOnly = screen.getByTestId('qa-didyoufind-modal-readonly');

        expect(textArea.scrollTop).toBe(readOnly.scrollTop);

        fireEvent.scroll(textArea, {y: 0});

        expect(textArea.scrollTop).toBe(readOnly.scrollTop);

    }, 15000)

    it("closes the modal on X button click", async () => {
        const onClose = jest.fn();

        render(<Modal show onClose={onClose} />);
        expect(screen.queryByTestId('qa-didyoufind-modal')).not.toBeNull();

        await user.click(screen.getByTestId('qa-didyoufind-modal-close-icon'));
        expect(onClose).toHaveBeenCalled();
    });

    it("closes the modal on close button click", async () => {
        const onClose = jest.fn();

        render(<Modal show onClose={onClose} />);
        expect(screen.queryByTestId('qa-didyoufind-modal')).not.toBeNull();

        await user.click(screen.getByTestId('qa-didyoufind-modal-close-btn'));
        expect(onClose).toHaveBeenCalled();
    });

    it('should not have a "dark" class if the darkMode prop is missing', () => {
        render(<Modal show />);

        const modal = screen.queryByTestId('qa-didyoufind-modal');
        expect(modal).not.toBeNull();
        expect(modal.classList).not.toContain('dark');
    });

    it('should have a "dark" class if the darkMode prop is true', () => {
        render(<Modal show dark />);

        const modal = screen.queryByTestId('qa-didyoufind-modal');
        expect(modal).not.toBeNull();
        expect(modal.classList).toContain('dark');
    });

    it('should not have a "dark" class if the darkMode prop is false', () => {
        render(<Modal show dark={false}/>);

        const modal = screen.queryByTestId('qa-didyoufind-modal');
        expect(modal).not.toBeNull();
        expect(modal.classList).not.toContain('dark');
    });
});