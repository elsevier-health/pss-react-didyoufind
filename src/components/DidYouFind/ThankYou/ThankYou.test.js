/**
 * @jest-environment jsdom
 */

import "babel-polyfill";
import React from "react";
import { render, screen } from "@testing-library/react";

import ThankYou from './ThankYou';

describe('<ThankYou />', () => {
    it('should render a thank you message', () => {
        render(<ThankYou />);
        expect(screen.getByText('Thanks for responding.')).not.toBeNull();
    });

    it('should not have a "dark" class if the darkMode prop is missing', () => {
        render(<ThankYou />);
        const thankYou = screen.getByTestId('qa-didyoufind-thankyou');
        expect(thankYou).not.toBeNull();
        expect(thankYou.classList).not.toContain('dark')
    });

    it('should have a "dark" class if the darkMode prop is true', () => {
        render(<ThankYou darkMode />);
        const thankYou = screen.getByTestId('qa-didyoufind-thankyou');
        expect(thankYou).not.toBeNull();
        expect(thankYou.classList).toContain('dark')
    });

    it('should not have a "dark" class if the darkMode prop is false', () => {
        render(<ThankYou darkMode={false} />);
        const thankYou = screen.getByTestId('qa-didyoufind-thankyou');
        expect(thankYou).not.toBeNull();
        expect(thankYou.classList).not.toContain('dark')
    });
});