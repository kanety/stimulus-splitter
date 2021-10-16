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

  let message;
  beforeEach(() => {
    $('div').addEventListener('splitter:resized', e => {
      message = 'resized: ' + e.detail.splitter.getAttribute('data-splitter-id');
    });
  });

  beforeEach(() => {
    $('hr[data-splitter-id="s1"]').dispatchEvent(mockMouseEvent('mousedown', { bubbles: true }));
  });

  it('resizes', () => {
    document.dispatchEvent(mockMouseEvent('selectstart', { bubbles: true }));
    document.dispatchEvent(mockMouseEvent('mousemove', { bubbles: true }));
    document.dispatchEvent(mockMouseEvent('mouseup', { bubbles: true }));
    expect(message).toEqual('resized: s1');
  });
});
