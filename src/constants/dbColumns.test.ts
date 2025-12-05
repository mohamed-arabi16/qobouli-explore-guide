import { PROGRAMS_VIEW_COLUMNS } from './dbColumns';

describe('Database Column Definitions', () => {
  describe('PROGRAMS_VIEW_COLUMNS', () => {
    const expectedColumns: string[] = [
      'program_id',
      'program_name_en',
      'university_name',
      'city',
      'tuition_after_discount',
      'original_tuition',
      'language_id',
      'program_type_id',
      'start_date',
      'is_private',
      'is_active',
      'major_slug',
    ];

    it('should contain the exact list of columns for programs_view', () => {
      expect(PROGRAMS_VIEW_COLUMNS).toEqual(expectedColumns);
    });

    it('should have the correct number of columns', () => {
      expect(PROGRAMS_VIEW_COLUMNS.length).toBe(expectedColumns.length);
    });

    // Optional: Test for specific columns if their presence is critical
    it('should include essential columns like program_id and major_slug', () => {
      expect(PROGRAMS_VIEW_COLUMNS).toContain('program_id');
      expect(PROGRAMS_VIEW_COLUMNS).toContain('major_slug');
      expect(PROGRAMS_VIEW_COLUMNS).toContain('university_name'); // From u.name
    });

    // Optional: Check for columns that should NOT be there (if any were mistakenly added before)
    it('should not contain columns that have been moved to local lookups', () => {
      expect(PROGRAMS_VIEW_COLUMNS).not.toContain('program_name_ar');
      expect(PROGRAMS_VIEW_COLUMNS).not.toContain('university_name_ar');
      expect(PROGRAMS_VIEW_COLUMNS).not.toContain('currency');
      expect(PROGRAMS_VIEW_COLUMNS).not.toContain('logo_url');
      expect(PROGRAMS_VIEW_COLUMNS).not.toContain('country_name_en');
      expect(PROGRAMS_VIEW_COLUMNS).not.toContain('country_name_ar');
    });
  });
});
