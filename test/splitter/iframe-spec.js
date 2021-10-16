describe('iframe', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="st-splitter-vertical" data-controller="splitter">
        <div>content 1</div>
        <hr data-splitter-id="s1">
        <div>content 2</div>
      </div>
      <iframe>
    `;
  });

  beforeEach(() => {
    $('hr[data-splitter-id="s1"]').dispatchEvent(mockMouseEvent('mousedown', { bubbles: true }));
  });

  it('resizes', () => {
    expect($('iframe').style.pointerEvents).toEqual('none');
    document.dispatchEvent(mockMouseEvent('mouseup', { bubbles: true }));
    expect($('iframe').style.pointerEvents).toEqual('');
  });
});
