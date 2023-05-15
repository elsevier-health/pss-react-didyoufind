/**
 * @jest-environment jsdom
 */

import "babel-polyfill";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ThankYouNo from './ThankYouNo';



describe('<ThankYouNo />', () => {
    const setShowModal = jest.fn();

    it('should not have a "dark" class if the darkMode prop is missing', () => {
        render(<ThankYouNo setShowModal={setShowModal} />);
        const didYouFind = screen.getByTestId("qa-didyoufind-thankyouno");
        expect(didYouFind).not.toBeNull();
        expect(didYouFind.classList).not.toContain('dark');
    });

    it('should have a "dark" class if the darkMode prop is true', () => {
        render(<ThankYouNo setShowModal={setShowModal} darkMode />);
        const didYouFind = screen.getByTestId("qa-didyoufind-thankyouno");
        expect(didYouFind).not.toBeNull();
        expect(didYouFind.classList).toContain('dark');
    });

    it('should not have a "dark" class if the darkMode prop is false', () => {
        render(<ThankYouNo setShowModal={setShowModal} darkMode={false} />);
        const didYouFind = screen.getByTestId("qa-didyoufind-thankyouno");
        expect(didYouFind).not.toBeNull();
        expect(didYouFind.classList).not.toContain('dark');
    });

    it('calls props.setShowModal when button is clicked', async () => {
        render(<ThankYouNo setShowModal={setShowModal} />);

        await userEvent.click(screen.getByText("What were you looking for?"));

        expect(setShowModal).toHaveBeenCalledTimes(1);
    });

});