describe('basic', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="st-splitter-vertical" data-controller="splitter">
        <div>content 1</div>
        <hr data-splitter-id="s1">
        <div>content 2</div>
      </div>
      <div class="st-splitter-horizontal" data-controller="splitter">
        <div>content 1</div>
        <hr data-splitter-id="s2">
        <div>content 2</div>
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
      expect($('hr[data-splitter-id="s1"]').matches('.st-splitter--dragging')).toEqual(false);
      expect($('hr[data-splitter-id="s1"]').previousElementSibling.style.width).toEqual('300px');
    });
  });

  describe('horizontal', () => {
    beforeEach(() => {
      $('hr[data-splitter-id="s2"]').dispatchEvent(mockMouseEvent('mousedown', { bubbles: true, pageX: 0, pageY: 0 }));
    });

    it('resizes', () => {
      document.dispatchEvent(mockMouseEvent('mousemove', { bubbles: true, pageX: 100, pageY: 100 }));
      document.dispatchEvent(mockMouseEvent('mouseup', { bubbles: true }));
      expect($('hr[data-splitter-id="s2"]').matches('.st-splitter--dragging')).toEqual(false);
      expect($('hr[data-splitter-id="s2"]').previousElementSibling.style.height).toEqual('300px');
    });
  });
});
