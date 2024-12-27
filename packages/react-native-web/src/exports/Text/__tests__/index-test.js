/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/jsx-no-bind */

import React from 'react';
import Text from '../';
import { createEventTarget, setPointerEvent } from 'dom-event-testing-library';
import { act, render } from '@testing-library/react';

describe('components/Text', () => {
  test('default', () => {
    const { container } = render(<Text />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('nested', () => {
    const { container } = render(<Text children={<Text testID="child" />} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "aria-label"', () => {
    test('value is set', () => {
      const { container } = render(<Text aria-label="accessibility label" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "aria-labelledby"', () => {
    test('value is set', () => {
      const { container } = render(<Text aria-labelledby="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "aria-live"', () => {
    test('value is set', () => {
      const { container } = render(<Text aria-live="polite" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "role"', () => {
    test('value is set', () => {
      const { container } = render(<Text role="none" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is "button"', () => {
      const { container } = render(<Text role="button" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value alters HTML element', () => {
      const { container } = render(<Text role="article" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "dir"', () => {
    test('value is "ltr"', () => {
      const { container } = render(<Text dir="ltr" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is "rtl"', () => {
      const { container } = render(<Text dir="rtl" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "href"', () => {
    test('value is set', () => {
      const { container } = render(<Text href="https://example.com" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('href with accessibilityRole', () => {
      const { container } = render(
        <Text accessibilityRole="none" href="https://example.com" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "hrefAttrs"', () => {
    test('requires "href"', () => {
      const { container } = render(
        <Text hrefAttrs={{ download: 'filename.jpg' }} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is set', () => {
      const hrefAttrs = {
        download: 'filename.jpg',
        rel: 'nofollow',
        target: '_blank'
      };
      const { container } = render(
        <Text href="https://example.com" hrefAttrs={hrefAttrs} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('target variant is set', () => {
      const hrefAttrs = {
        target: 'blank'
      };
      const { container } = render(
        <Text href="https://example.com" hrefAttrs={hrefAttrs} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('null values are excluded', () => {
      const hrefAttrs = {
        download: null,
        rel: null,
        target: null
      };
      const { container } = render(
        <Text href="https://example.com" hrefAttrs={hrefAttrs} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "lang"', () => {
    test('undefined', () => {
      const { container } = render(<Text />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('fr', () => {
      const { container } = render(<Text lang="fr" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('ar', () => {
      const { container } = render(<Text lang="ar" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('with dir', () => {
      const { container } = render(<Text dir="ltr" lang="ar" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "nativeID"', () => {
    test('value is set', () => {
      const { container } = render(<Text nativeID="nativeID" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "numberOfLines"', () => {
    test('value is set', () => {
      const { container } = render(<Text numberOfLines={3} />);
      expect(container.firstChild).toMatchSnapshot();
    });
    test('value is set to one', () => {
      const { container } = render(<Text numberOfLines={1} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "onBlur"', () => {
    test('is called', () => {
      const onBlur = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<Text onBlur={onBlur} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      const body = createEventTarget(document.body);
      act(() => {
        target.focus();
        body.focus({ relatedTarget: target.node });
      });
      expect(onBlur).toBeCalled();
    });
  });

  describe('prop "onClick"', () => {
    test('is called', () => {
      const onClick = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<Text onClick={onClick} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.click();
      });
      expect(onClick).toBeCalled();
    });

    test('is still called if "onPress" is provided', () => {
      const onClick = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<Text onClick={onClick} onPress={() => {}} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.click();
      });
      expect(onClick).toBeCalled();
    });
  });

  describe('prop "onFocus"', () => {
    test('is called', () => {
      const onFocus = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<Text onFocus={onFocus} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.focus();
      });
      expect(onFocus).toBeCalled();
    });
  });

  describe('prop "onPointerDown"', () => {
    beforeEach(() => {
      setPointerEvent(true);
    });
    afterEach(() => {
      setPointerEvent(false);
    });

    test('is called', () => {
      const onPointerDown = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<Text onPointerDown={onPointerDown} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerdown({ pointerType: 'touch' });
      });
      expect(onPointerDown).toBeCalled();
    });
  });

  describe('prop "onPress"', () => {
    test('is called', () => {
      const onPress = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<Text onPress={onPress} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerdown({ button: 0 });
        target.pointerup({ button: 0 });
      });
      expect(onPress).toBeCalled();
    });

    test('is not called if "onClick" is provided', () => {
      const onPress = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<Text onClick={() => {}} onPress={onPress} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.click();
      });
      expect(onPress).not.toBeCalled();
    });
  });

  describe('prop "ref"', () => {
    test('value is set', () => {
      const ref = jest.fn();
      render(<Text ref={ref} />);
      expect(ref).toBeCalled();
    });

    test('is not called for prop changes', () => {
      const ref = jest.fn();
      let rerender;
      act(() => {
        ({ rerender } = render(
          <Text nativeID="123" ref={ref} style={{ borderWidth: 5 }} />
        ));
      });
      expect(ref).toHaveBeenCalledTimes(1);
      act(() => {
        rerender(<Text nativeID="1234" ref={ref} style={{ borderWidth: 6 }} />);
      });
      expect(ref).toHaveBeenCalledTimes(1);
    });

    test('node has imperative methods', () => {
      const ref = React.createRef();
      act(() => {
        render(<Text ref={ref} />);
      });
      const node = ref.current;
      expect(typeof node.measure === 'function');
      expect(typeof node.measureLayout === 'function');
      expect(typeof node.measureInWindow === 'function');
    });
  });

  describe('prop "selectable"', () => {
    test('value of false', () => {
      const { container } = render(<Text selectable={false} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value of true', () => {
      const { container } = render(<Text selectable={true} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "style"', () => {
    test('value is set', () => {
      const { container } = render(<Text style={{ borderWidth: 5 }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "testID"', () => {
    test('value is set', () => {
      const { container } = render(<Text testID="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
