// FE-4: Centralise the view column list
// As per PRD Section 4.1 and FE-1

export const PROGRAMS_VIEW_COLUMNS: string[] = [
  'program_id',
  'program_name_en',
  'university_name', // This is university_name_en in practice from the view
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
