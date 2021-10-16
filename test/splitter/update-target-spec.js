describe('update-target', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="st-splitter-vertical"
           data-controller="splitter"
           data-splitter-update-target-value="both">
        <div>content 1</div>
        <hr data-splitter-id="s1">
        <div>
          <div class="st-splitter-horizontal">
            <div>content 2</div>
            <hr data-splitter-id="s2">
            <div>content 2</div>
          </div>
        </div>
      </div>
    `;
  });

  beforeEach(() => {
    mockElementSize('div', 200, 200);
  });

  describe('vertical', () => {
    beforeEach(() => {
      $('hr[data-splitter-id="s1"]').dispatchEvent(mockMouseEvent('mousedown', { bubbles: true, pageX: 0, pageY: 0 }));
    });

    it('resizes', () => {
      document.dispatchEvent(mockMouseEvent('mousemove', { bubbles: true, pageX: 100, pageY: 100 }));
      document.dispatchEvent(mockMouseEvent('mouseup', { bubbles: true }));
      expect($('hr[data-splitter-id="s1"]').previousElementSibling.style.width).toEqual('300px');
      expect($('hr[data-splitter-id="s1"]').nextElementSibling.style.width).toEqual('100px');
    });
  });

  describe('horizontal', () => {
    beforeEach(() => {
      $('hr[data-splitter-id="s2"]').dispatchEvent(mockMouseEvent('mousedown', { bubbles: true, pageX: 0, pageY: 0 }));
    });

    it('resizes', () => {
      document.dispatchEvent(mockMouseEvent('mousemove', { bubbles: true, pageX: 100, pageY: 100 }));
      document.dispatchEvent(mockMouseEvent('mouseup', { bubbles: true }));
      expect($('hr[data-splitter-id="s2"]').previousElementSibling.style.height).toEqual('300px');
      expect($('hr[data-splitter-id="s2"]').nextElementSibling.style.height).toEqual('100px');
    });
  });
});
