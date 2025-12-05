import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import Announcement from './Announcement';
import { announcementsData, AnnouncementItem } from '@/data/announcements';
import { LanguageContext, type LanguageContextType } from '@/contexts/LanguageContext';

// Announcements data used by the component
const dummyAnnouncements = announcementsData;

// Mock LanguageContext
const mockLanguageContextValue: LanguageContextType = {
  language: 'en',
  setLanguage: jest.fn(),
  t: (key: string) => {
    // Simple mock t function, you might want to expand this for more complex keys
    const translations: { [key: string]: string } = {
        'ui.announcement.title': 'Important Announcements',
        'ui.announcement.noAnnouncements': 'No announcements at the moment.',
        'ui.announcement.readMore': 'Read more...',
        'ui.announcement.previous': 'Previous',
        'ui.announcement.next': 'Next',
        'ui.dialog.close': 'Close',
    };
    return translations[key] || key;
  },
};

const renderWithLanguageContext = (component: React.ReactElement) => {
  return render(
    <LanguageContext.Provider value={mockLanguageContextValue}>
      {component}
    </LanguageContext.Provider>
  );
};

describe('Announcement Component', () => {
  it('renders the main title', () => {
    renderWithLanguageContext(<Announcement />);
    expect(screen.getByText('Important Announcements')).toBeInTheDocument();
  });

  it('renders all announcement previews', () => {
    renderWithLanguageContext(<Announcement />);
    dummyAnnouncements.forEach(announcement => {
      expect(screen.getByText(announcement.title.en)).toBeInTheDocument();
      expect(screen.getByText(announcement.preview.en)).toBeInTheDocument();
    });
  });

  it('sets data-active on the centered slide', () => {
    renderWithLanguageContext(<Announcement />);
    const slides = screen.getAllByRole('group');
    expect(slides[0]).toHaveAttribute('data-active', 'true');
    if (slides[1]) {
      expect(slides[1]).toHaveAttribute('data-active', 'false');
    }
  });

  it('opens a dialog with full text when an announcement card is clicked', () => {
    renderWithLanguageContext(<Announcement />);
    const firstAnnouncement = dummyAnnouncements[0];

    // Find the card by its title or preview text. Let's use title.
    // The Card itself is the trigger due to DialogTrigger's asChild prop.
    const announcementCard = screen.getByText(firstAnnouncement.title.en).closest('.cursor-pointer');

    if (!announcementCard) {
      throw new Error('Announcement card trigger not found for: ' + firstAnnouncement.title.en);
    }

    fireEvent.click(announcementCard);

    // Check if the dialog is open and displays the full text and title
    // The DialogContent is rendered in a portal, so it might not be a direct descendant.
    // We expect the title and full text to be visible.
    expect(screen.getByText(firstAnnouncement.title.en, { selector: 'h2' })).toBeVisible(); // DialogTitle is h2
    const snippet = firstAnnouncement.fullText.en.slice(0, 20);
    expect(screen.getByText(new RegExp(snippet), { exact: false })).toBeVisible();
  });

  it('displays "No announcements" message when there are no announcements', () => {
    // Temporarily mock useState to return an empty array for announcements
    const originalUseState = React.useState;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [[] as AnnouncementItem[], jest.fn()]);

    renderWithLanguageContext(<Announcement />);
    expect(screen.getByText('No announcements at the moment.')).toBeInTheDocument();

    // Restore original useState
    jest.spyOn(React, 'useState').mockImplementation(originalUseState as typeof React.useState);
  });

  // Test for Arabic language (optional, but good for coverage)
  it('renders titles and previews in Arabic when language is set to "ar"', () => {
    const arabicMockContextValue: LanguageContextType = {
      language: 'ar',
      setLanguage: jest.fn(),
      t: (key: string) => {
        const translations: { [key: string]: string } = {
            'ui.announcement.title': 'الإعلانات الهامة',
            'ui.announcement.noAnnouncements': 'لا توجد إعلانات حاليًا.',
            'ui.announcement.readMore': 'اقرأ المزيد...',
            'ui.announcement.previous': 'السابق',
            'ui.announcement.next': 'التالي',
            'ui.dialog.close': 'إغلاق',
        };
        return translations[key] || key;
      },
    };
    render(
      <LanguageContext.Provider value={arabicMockContextValue}>
        <Announcement />
      </LanguageContext.Provider>
    );

    expect(screen.getByText('الإعلانات الهامة')).toBeInTheDocument();
    dummyAnnouncements.forEach(announcement => {
      expect(screen.getByText(announcement.title.ar)).toBeInTheDocument();
      expect(screen.getByText(announcement.preview.ar)).toBeInTheDocument();
    });
  });

  it('dialog has a close button and it works', () => {
    renderWithLanguageContext(<Announcement />);
    const firstAnnouncement = announcementsData[0];
    const announcementCard = screen.getByText(firstAnnouncement.title.en).closest('.cursor-pointer');

    if (!announcementCard) {
      throw new Error('Announcement card trigger not found for: ' + firstAnnouncement.title.en);
    }

    fireEvent.click(announcementCard); // Open the dialog

    // Check if the dialog title is visible (confirming dialog is open)
    expect(screen.getByText(firstAnnouncement.title.en, { selector: 'h2' })).toBeVisible();

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toBeVisible();

    fireEvent.click(closeButton); // Click the close button

    // After closing, the dialog title (or full text) should not be visible.
    // Need to be careful here, as Radix UI might unmount dialog content or just hide it.
    // queryByText is good for asserting absence.
    expect(screen.queryByText(firstAnnouncement.title.en, { selector: 'h2' })).not.toBeInTheDocument();
    const snippet = firstAnnouncement.fullText.en.slice(0, 20);
    expect(screen.queryByText(new RegExp(snippet), { exact: false })).not.toBeInTheDocument();
  });
});
