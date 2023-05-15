/**
 * @jest-environment jsdom
 */

import "babel-polyfill";
import React from "react";
import {render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import logger from './logger';

import DidYouFind from './DidYouFind';

jest.mock('./logger.js');

const props = {
    darkMode: true,
    documentId: 'documentId',
    documentName: 'documentName',
    documentUrl: 'documentUrl',
    searchTerm: 'searchTerm'
}

describe("<DidYouFind />", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('sends an error message to the console if the search outcome ajax fails', async () => {
        axios.put.mockRejectedValueOnce('error');

        render(<DidYouFind {...props} />);
        expect(screen.getByText('Yes')).not.toBeNull();
        expect(screen.getByText('No')).not.toBeNull();

        await userEvent.click(screen.getByTestId('qa-didyoufind-yes-radio'));

        expect(screen.queryByText('Yes')).toBeNull();
        expect(screen.queryByText('No')).toBeNull();
        expect(screen.getByTestId('qa-didyoufind-thankyou')).not.toBeNull();

        expect(axios.put).toHaveBeenCalledWith("/search/outcome", {
            searchTerm: props.searchTerm,
            documentId: props.documentId,
            documentName: props.documentName,
            documentUrl: props.documentUrl,
            outcome: 'yes'
        });
        expect(logger.error).toHaveBeenCalledWith('Error error');
    });

    beforeEach(() => {
        axios.put.mockResolvedValue({ data: {} });
    });

    it("should have a 'dark' class if a darkMode props is passed in", () => {
        render(<DidYouFind darkMode />);
        const didYouFind = screen.getByTestId('qa-didyoufind');
        expect(didYouFind).not.toBeNull();
        expect(didYouFind.classList).toContain('dark');
    });

    it("should have a 'dark' class if a darkMode=true props is passed in", () => {
        render(<DidYouFind darkMode={true} />);
        const didYouFind = screen.getByTestId('qa-didyoufind');
        expect(didYouFind).not.toBeNull();
        expect(didYouFind.classList).toContain('dark');
    });

    it("should not have a 'dark' class no darkMode prop is passed in", () => {
        render(<DidYouFind />);
        const didYouFind = screen.getByTestId('qa-didyoufind');
        expect(didYouFind).not.toBeNull();
        expect(didYouFind.classList).not.toContain('dark');
    });

    it("should not have a 'dark' class if the darkMode prop is false", () => {
        render(<DidYouFind darkMode={false} />);
        const didYouFind = screen.getByTestId('qa-didyoufind');
        expect(didYouFind).not.toBeNull();
        expect(didYouFind.classList).not.toContain('dark');
    });

    it('sends the outcome when yes is clicked', async () => {
        render(<DidYouFind {...props} />);
        expect(screen.getByText('Yes')).not.toBeNull();
        expect(screen.getByText('No')).not.toBeNull();

        await userEvent.click(screen.getByTestId('qa-didyoufind-yes-radio'));

        expect(screen.queryByText('Yes')).toBeNull();
        expect(screen.queryByText('No')).toBeNull();
        expect(screen.getByTestId('qa-didyoufind-thankyou')).not.toBeNull();

        expect(axios.put).toHaveBeenCalledWith("/search/outcome", {
            searchTerm: props.searchTerm,
            documentId: props.documentId,
            documentName: props.documentName,
            documentUrl: props.documentUrl,
            outcome: 'yes'
        });
        expect(logger.log).toHaveBeenCalledWith('success');
    });

    it('shows thankyou when feedback is submitted', async () => {
        render(<DidYouFind {...props} />);
        expect(screen.getByText('Yes')).not.toBeNull();
        expect(screen.getByText('No')).not.toBeNull();

        await userEvent.click(screen.getByTestId('qa-didyoufind-no-radio'));

        expect(screen.queryByText('Yes')).toBeNull();
        expect(screen.queryByText('No')).toBeNull();
        expect(screen.getByTestId('qa-didyoufind-thankyouno')).not.toBeNull();

        expect(axios.put).toHaveBeenCalledWith("/search/outcome", {
            searchTerm: props.searchTerm,
            documentId: props.documentId,
            documentName: props.documentName,
            documentUrl: props.documentUrl,
            outcome: 'no'
        });
        expect(logger.log).toHaveBeenCalledWith('success');

        await userEvent.click(screen.getByText("What were you looking for?"));

        expect(screen.getByTestId('qa-didyoufind-modal')).not.toBeNull();

        const feedback = 'this is a test';
        await userEvent.type(screen.getByRole('textbox'), feedback);
        await userEvent.click(screen.getByTestId('qa-didyoufind-submit-btn'));

        expect(axios.put).toHaveBeenCalledWith("/search/feedback", {
            searchTerm: props.searchTerm,
            documentId: props.documentId,
            documentName: props.documentName,
            documentUrl: props.documentUrl,
            feedback: feedback
        });
        expect(logger.log).toHaveBeenCalledWith('success');
        expect(screen.getByTestId('qa-didyoufind-thankyou')).not.toBeNull();
    });

    it('sends the outcome when no is clicked', async () => {
        render(<DidYouFind {...props} />);
        expect(screen.getByText('Yes')).not.toBeNull();
        expect(screen.getByText('No')).not.toBeNull();

        await userEvent.click(screen.getByTestId('qa-didyoufind-no-radio'));

        expect(screen.queryByText('Yes')).toBeNull();
        expect(screen.queryByText('No')).toBeNull();
        expect(screen.getByTestId('qa-didyoufind-thankyouno')).not.toBeNull();

        expect(axios.put).toHaveBeenCalledWith("/search/outcome", {
            searchTerm: props.searchTerm,
            documentId: props.documentId,
            documentName: props.documentName,
            documentUrl: props.documentUrl,
            outcome: 'no'
        });
        expect(logger.log).toHaveBeenCalledWith('success');
    });

    it('modal closes when close buttons are clicked', async () => {
        render(<DidYouFind {...props} />);
        expect(screen.getByText('Yes')).not.toBeNull();
        expect(screen.getByText('No')).not.toBeNull();

        await userEvent.click(screen.getByTestId('qa-didyoufind-no-radio'));

        expect(screen.queryByText('Yes')).toBeNull();
        expect(screen.queryByText('No')).toBeNull();
        expect(screen.getByTestId('qa-didyoufind-thankyouno')).not.toBeNull();

        expect(axios.put).toHaveBeenCalledWith("/search/outcome", {
            searchTerm: props.searchTerm,
            documentId: props.documentId,
            documentName: props.documentName,
            documentUrl: props.documentUrl,
            outcome: 'no'
        });
        expect(logger.log).toHaveBeenCalledWith('success');

        await userEvent.click(screen.getByText("What were you looking for?"));

        expect(screen.getByTestId('qa-didyoufind-modal')).not.toBeNull();
        await userEvent.click(screen.getByTestId('qa-didyoufind-modal-close-btn'));

        expect(screen.queryByTestId('qa-didyoufind-modal')).toBeNull();
    });


});