import { describe, expect, test } from 'bun:test';
import { orderTestimonies } from './testimony-order';

describe('editorial testimony order', () => {
  test('places Suzanne halfway through the list without losing videos', () => {
    const source = ['1235933143', 'other-1', 'other-2', 'other-3', 'other-4', 'other-5'].map(vimeoUrl => ({ vimeoUrl }));
    const ordered = orderTestimonies(source);
    expect(ordered[3].vimeoUrl).toBe('1235933143');
    expect(ordered).toHaveLength(6);
    expect(source[0].vimeoUrl).toBe('1235933143');
  });

  test('prioritizes the existing youth selection in its editorial order', () => {
    const source = ['other-1', '1204289580', 'other-2', '1205136000', '1205452716'].map(vimeoUrl => ({ vimeoUrl }));
    expect(orderTestimonies(source).map(video => video.vimeoUrl)).toEqual([
      '1205452716', '1205136000', '1204289580', 'other-1', 'other-2',
    ]);
  });

  test('applies to a filtered subset without adding absent videos', () => {
    expect(orderTestimonies([{ vimeoUrl: 'other' }, { vimeoUrl: '1204289580' }])).toEqual([
      { vimeoUrl: '1204289580' }, { vimeoUrl: 'other' },
    ]);
    expect(orderTestimonies([])).toEqual([]);
  });
});