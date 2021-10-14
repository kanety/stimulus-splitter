describe('horizontal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="st-splitter-vertical"
           data-controller="splitter"
           data-splitter-update-target-value="both">
        <div>
          <p>content 1</p>
        </div>
        <hr data-splitter-id="s1">
        <div>
          <div class="st-splitter-horizontal">
            <div>
              <p>content 2</p>
            </div>
            <hr data-splitter-id="s2">
            <div>
              <p>content 2</p>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  describe('vertical', () => {
    beforeEach(() => {
      $('hr[data-splitter-id="s1"]').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    it('resizes', () => {
      document.dispatchEvent(new MouseEvent('selectstart', { bubbles: true }));
      document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
      expect($('hr[data-splitter-id="s1"]').matches('.st-splitter--dragging')).toEqual(true);
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      expect($('hr[data-splitter-id="s1"]').matches('.st-splitter--dragging')).toEqual(false);
    });
  });

  describe('horizontal', () => {
    beforeEach(() => {
      $('hr[data-splitter-id="s2"]').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    it('resizes', () => {
      document.dispatchEvent(new MouseEvent('selectstart', { bubbles: true }));
      document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
      expect($('hr[data-splitter-id="s2"]').matches('.st-splitter--dragging')).toEqual(true);
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      expect($('hr[data-splitter-id="s2"]').matches('.st-splitter--dragging')).toEqual(false);
    });
  });
});
