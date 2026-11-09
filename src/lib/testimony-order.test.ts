import { describe, it as test } from 'node:test';
import assert from 'node:assert/strict';
import { orderTestimonies } from './testimony-order';

describe('editorial testimony order', () => {
  test('places Suzanne halfway through the list without losing videos', () => {
    const source = ['1235933143', 'other-1', 'other-2', 'other-3', 'other-4', 'other-5'].map(vimeoUrl => ({ vimeoUrl }));
    const ordered = orderTestimonies(source);
    assert.equal(ordered[3].vimeoUrl, '1235933143');
    assert.equal(ordered.length, 6);
    assert.equal(source[0].vimeoUrl, '1235933143');
  });

  test('prioritizes the existing youth selection in its editorial order', () => {
    const source = ['other-1', '1204289580', 'other-2', '1205136000', '1205452716'].map(vimeoUrl => ({ vimeoUrl }));
    assert.deepEqual(orderTestimonies(source).map(video => video.vimeoUrl), [
      '1205452716', '1205136000', '1204289580', 'other-1', 'other-2',
    ]);
  });

  test('applies to a filtered subset without adding absent videos', () => {
    assert.deepEqual(orderTestimonies([{ vimeoUrl: 'other' }, { vimeoUrl: '1204289580' }]), [
      { vimeoUrl: '1204289580' }, { vimeoUrl: 'other' },
    ]);
    assert.deepEqual(orderTestimonies([]), []);
  });
});