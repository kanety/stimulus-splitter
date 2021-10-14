describe('iframe', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="st-splitter-vertical" data-controller="splitter">
        <div>
          <p>content 1</p>
        </div>
        <hr data-splitter-id="s1">
        <div>
          <p>content 2</p>
        </div>
      </div>
      <iframe>
    `;
  });

  beforeEach(() => {
    $('hr[data-splitter-id="s1"]').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  });

  it('resizes', () => {
    expect($('iframe').style.pointerEvents).toEqual('none');
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    expect($('iframe').style.pointerEvents).toEqual('');
  });
});
