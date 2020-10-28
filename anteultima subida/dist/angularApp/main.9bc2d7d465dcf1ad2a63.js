(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (t, e, n) {
      t.exports = n("zUnb");
    },
    zUnb: function (t, e, n) {
      "use strict";
      function r(t) {
        return "function" == typeof t;
      }
      n.r(e);
      let s = !1;
      const o = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack
            );
          } else
            s &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          s = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s;
        },
      };
      function i(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const a = {
          closed: !0,
          next(t) {},
          error(t) {
            if (o.useDeprecatedSynchronousErrorHandling) throw t;
            i(t);
          },
          complete() {},
        },
        l = (() =>
          Array.isArray || ((t) => t && "number" == typeof t.length))();
      function c(t) {
        return null !== t && "object" == typeof t;
      }
      const u = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      let h = (() => {
        class t {
          constructor(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && (this._unsubscribe = t);
          }
          unsubscribe() {
            let e;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _unsubscribe: s,
              _subscriptions: o,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this);
            else if (null !== n)
              for (let t = 0; t < n.length; ++t) n[t].remove(this);
            if (r(s))
              try {
                s.call(this);
              } catch (i) {
                e = i instanceof u ? d(i.errors) : [i];
              }
            if (l(o)) {
              let t = -1,
                n = o.length;
              for (; ++t < n; ) {
                const n = o[t];
                if (c(n))
                  try {
                    n.unsubscribe();
                  } catch (i) {
                    (e = e || []),
                      i instanceof u ? (e = e.concat(d(i.errors))) : e.push(i);
                  }
              }
            }
            if (e) throw new u(e);
          }
          add(e) {
            let n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
              case "function":
                n = new t(e);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof t)) {
                  const e = n;
                  (n = new t()), (n._subscriptions = [e]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + e + " added to Subscription."
                );
            }
            let { _parentOrParents: r } = n;
            if (null === r) n._parentOrParents = this;
            else if (r instanceof t) {
              if (r === this) return n;
              n._parentOrParents = [r, this];
            } else {
              if (-1 !== r.indexOf(this)) return n;
              r.push(this);
            }
            const s = this._subscriptions;
            return null === s ? (this._subscriptions = [n]) : s.push(n), n;
          }
          remove(t) {
            const e = this._subscriptions;
            if (e) {
              const n = e.indexOf(t);
              -1 !== n && e.splice(n, 1);
            }
          }
        }
        return (
          (t.EMPTY = (function (t) {
            return (t.closed = !0), t;
          })(new t())),
          t
        );
      })();
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e), []);
      }
      const p = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
      class f extends h {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!t) {
                this.destination = a;
                break;
              }
              if ("object" == typeof t) {
                t instanceof f
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new g(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new g(this, t, e, n));
          }
        }
        [p]() {
          return this;
        }
        static create(t, e, n) {
          const r = new f(t, e, n);
          return (r.syncErrorThrowable = !1), r;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class g extends f {
        constructor(t, e, n, s) {
          let o;
          super(), (this._parentSubscriber = t);
          let i = this;
          r(e)
            ? (o = e)
            : e &&
              ((o = e.next),
              (n = e.error),
              (s = e.complete),
              e !== a &&
                ((i = Object.create(e)),
                r(i.unsubscribe) && this.add(i.unsubscribe.bind(i)),
                (i.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = i),
            (this._next = o),
            (this._error = n),
            (this._complete = s);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            o.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = o;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : i(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              i(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              o.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), o.useDeprecatedSynchronousErrorHandling))
              throw n;
            i(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!o.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            e.call(this._context, n);
          } catch (r) {
            return o.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
              : (i(r), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
      const m = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
      function y(t) {
        return t;
      }
      let v = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: r } = this,
              s = (function (t, e, n) {
                if (t) {
                  if (t instanceof f) return t;
                  if (t[p]) return t[p]();
                }
                return t || e || n ? new f(t, e, n) : new f(a);
              })(t, e, n);
            if (
              (s.add(
                r
                  ? r.call(s, this.source)
                  : this.source ||
                    (o.useDeprecatedSynchronousErrorHandling &&
                      !s.syncErrorThrowable)
                  ? this._subscribe(s)
                  : this._trySubscribe(s)
              ),
              o.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              o.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: r } = t;
                    if (e || r) return !1;
                    t = n && n instanceof f ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = w(e))((e, n) => {
              let r;
              r = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (s) {
                    n(s), r && r.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [m]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (0 === (e = t).length
                  ? y
                  : 1 === e.length
                  ? e[0]
                  : function (t) {
                      return e.reduce((t, e) => e(t), t);
                    })(this);
            var e;
          }
          toPromise(t) {
            return new (t = w(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function w(t) {
        if ((t || (t = o.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      const _ = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class b extends h {
        constructor(t, e) {
          super(),
            (this.subject = t),
            (this.subscriber = e),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class x extends f {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let S = (() => {
        class t extends v {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [p]() {
            return new x(this);
          }
          lift(t) {
            const e = new C(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new _();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                r = e.slice();
              for (let s = 0; s < n; s++) r[s].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new _();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              r = e.slice();
            for (let s = 0; s < n; s++) r[s].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new _();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let r = 0; r < e; r++) n[r].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new _();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new _();
            return this.hasError
              ? (t.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (t.complete(), h.EMPTY)
              : (this.observers.push(t), new b(this, t));
          }
          asObservable() {
            const t = new v();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new C(t, e)), t;
      })();
      class C extends S {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : h.EMPTY;
        }
      }
      function E(t) {
        return t && "function" == typeof t.schedule;
      }
      class T extends f {
        constructor(t, e, n) {
          super(),
            (this.parent = t),
            (this.outerValue = e),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      const k = (t) => (e) => {
        for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
        e.complete();
      };
      function A() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const R = A(),
        I = (t) => t && "number" == typeof t.length && "function" != typeof t;
      function O(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      const P = (t) => {
        if (t && "function" == typeof t[m])
          return (
            (r = t),
            (t) => {
              const e = r[m]();
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return e.subscribe(t);
            }
          );
        if (I(t)) return k(t);
        if (O(t))
          return (
            (n = t),
            (t) => (
              n
                .then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e)
                )
                .then(null, i),
              t
            )
          );
        if (t && "function" == typeof t[R])
          return (
            (e = t),
            (t) => {
              const n = e[R]();
              for (;;) {
                const e = n.next();
                if (e.done) {
                  t.complete();
                  break;
                }
                if ((t.next(e.value), t.closed)) break;
              }
              return (
                "function" == typeof n.return &&
                  t.add(() => {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        {
          const e = c(t) ? "an invalid object" : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
          );
        }
        var e, n, r;
      };
      function j(t, e, n, r, s = new T(t, n, r)) {
        if (!s.closed) return e instanceof v ? e.subscribe(s) : P(e)(s);
      }
      class N extends f {
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
        notifyError(t, e) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
      function U(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new D(t, e));
        };
      }
      class D {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new H(t, this.project, this.thisArg));
        }
      }
      class H extends f {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      function M(t, e) {
        return new v((n) => {
          const r = new h();
          let s = 0;
          return (
            r.add(
              e.schedule(function () {
                s !== t.length
                  ? (n.next(t[s++]), n.closed || r.add(this.schedule()))
                  : n.complete();
              })
            ),
            r
          );
        });
      }
      function L(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && "function" == typeof t[m];
                  })(t)
                )
                  return (function (t, e) {
                    return new v((n) => {
                      const r = new h();
                      return (
                        r.add(
                          e.schedule(() => {
                            const s = t[m]();
                            r.add(
                              s.subscribe({
                                next(t) {
                                  r.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  r.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  r.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (O(t))
                  return (function (t, e) {
                    return new v((n) => {
                      const r = new h();
                      return (
                        r.add(
                          e.schedule(() =>
                            t.then(
                              (t) => {
                                r.add(
                                  e.schedule(() => {
                                    n.next(t),
                                      r.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (t) => {
                                r.add(e.schedule(() => n.error(t)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (I(t)) return M(t, e);
                if (
                  (function (t) {
                    return t && "function" == typeof t[R];
                  })(t) ||
                  "string" == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new v((n) => {
                      const r = new h();
                      let s;
                      return (
                        r.add(() => {
                          s && "function" == typeof s.return && s.return();
                        }),
                        r.add(
                          e.schedule(() => {
                            (s = t[R]()),
                              r.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const n = s.next();
                                    (t = n.value), (e = n.done);
                                  } catch (r) {
                                    return void n.error(r);
                                  }
                                  e
                                    ? n.complete()
                                    : (n.next(t), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable"
              );
            })(t, e)
          : t instanceof v
          ? t
          : new v(P(t));
      }
      function F(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (r) =>
              r.pipe(
                F((n, r) => L(t(n, r)).pipe(U((t, s) => e(n, t, r, s))), n)
              )
          : ("number" == typeof e && (n = e), (e) => e.lift(new z(t, n)));
      }
      class z {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new $(t, this.project, this.concurrent));
        }
      }
      class $ extends N {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.active++, this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const r = new T(this, e, n),
            s = this.destination;
          s.add(r);
          const o = j(this, t, void 0, void 0, r);
          o !== r && s.add(o);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
        notifyComplete(t) {
          const e = this.buffer;
          this.remove(t),
            this.active--,
            e.length > 0
              ? this._next(e.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function V(t = Number.POSITIVE_INFINITY) {
        return F(y, t);
      }
      function q(t, e) {
        return e ? M(t, e) : new v(k(t));
      }
      function B() {
        return function (t) {
          return t.lift(new G(t));
        };
      }
      class G {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const r = new W(t, n),
            s = e.subscribe(r);
          return r.closed || (r.connection = n.connect()), s;
        }
      }
      class W extends f {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            r = t._connection;
          (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
        }
      }
      class Z extends v {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (t && !t.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new h()),
              t.add(this.source.subscribe(new K(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = h.EMPTY))),
            t
          );
        }
        refCount() {
          return B()(this);
        }
      }
      const Q = (() => {
        const t = Z.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class K extends x {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe();
          }
        }
      }
      function J() {
        return new S();
      }
      function Y(t) {
        return { toString: t }.toString();
      }
      function X(t, e, n) {
        return Y(() => {
          const r = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function s(...t) {
            if (this instanceof s) return r.apply(this, t), this;
            const e = new s(...t);
            return (n.annotation = e), n;
            function n(t, n, r) {
              const s = t.hasOwnProperty("__parameters__")
                ? t.__parameters__
                : Object.defineProperty(t, "__parameters__", { value: [] })
                    .__parameters__;
              for (; s.length <= r; ) s.push(null);
              return (s[r] = s[r] || []).push(e), t;
            }
          }
          return (
            n && (s.prototype = Object.create(n.prototype)),
            (s.prototype.ngMetadataName = t),
            (s.annotationCls = s),
            s
          );
        });
      }
      const tt = X("Inject", (t) => ({ token: t })),
        et = X("Optional"),
        nt = X("Self"),
        rt = X("SkipSelf");
      var st = (function (t) {
        return (
          (t[(t.Default = 0)] = "Default"),
          (t[(t.Host = 1)] = "Host"),
          (t[(t.Self = 2)] = "Self"),
          (t[(t.SkipSelf = 4)] = "SkipSelf"),
          (t[(t.Optional = 8)] = "Optional"),
          t
        );
      })({});
      function ot(t) {
        for (let e in t) if (t[e] === ot) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function it(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function at(t) {
        return {
          factory: t.factory,
          providers: t.providers || [],
          imports: t.imports || [],
        };
      }
      function lt(t) {
        return ct(t, t[ht]) || ct(t, t[ft]);
      }
      function ct(t, e) {
        return e && e.token === t ? e : null;
      }
      function ut(t) {
        return t && (t.hasOwnProperty(dt) || t.hasOwnProperty(gt))
          ? t[dt]
          : null;
      }
      const ht = ot({ "\u0275prov": ot }),
        dt = ot({ "\u0275inj": ot }),
        pt = ot({ "\u0275provFallback": ot }),
        ft = ot({ ngInjectableDef: ot }),
        gt = ot({ ngInjectorDef: ot });
      function mt(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(mt).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return "" + t.overriddenName;
        if (t.name) return "" + t.name;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function yt(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const vt = ot({ __forward_ref__: ot });
      function wt(t) {
        return (
          (t.__forward_ref__ = wt),
          (t.toString = function () {
            return mt(this());
          }),
          t
        );
      }
      function _t(t) {
        return "function" == typeof (e = t) &&
          e.hasOwnProperty(vt) &&
          e.__forward_ref__ === wt
          ? t()
          : t;
        var e;
      }
      const bt = "undefined" != typeof globalThis && globalThis,
        xt = "undefined" != typeof window && window,
        St =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Ct = "undefined" != typeof global && global,
        Et = bt || Ct || xt || St,
        Tt = ot({ "\u0275cmp": ot }),
        kt = ot({ "\u0275dir": ot }),
        At = ot({ "\u0275pipe": ot }),
        Rt = ot({ "\u0275mod": ot }),
        It = ot({ "\u0275loc": ot }),
        Ot = ot({ "\u0275fac": ot }),
        Pt = ot({ __NG_ELEMENT_ID__: ot });
      class jt {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = it({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        toString() {
          return "InjectionToken " + this._desc;
        }
      }
      const Nt = new jt("INJECTOR", -1),
        Ut = {},
        Dt = /\n/gm,
        Ht = ot({ provide: String, useValue: ot });
      let Mt,
        Lt = void 0;
      function Ft(t) {
        const e = Lt;
        return (Lt = t), e;
      }
      function zt(t) {
        const e = Mt;
        return (Mt = t), e;
      }
      function $t(t, e = st.Default) {
        if (void 0 === Lt)
          throw new Error("inject() must be called from an injection context");
        return null === Lt
          ? qt(t, void 0, e)
          : Lt.get(t, e & st.Optional ? null : void 0, e);
      }
      function Vt(t, e = st.Default) {
        return (Mt || $t)(_t(t), e);
      }
      function qt(t, e, n) {
        const r = lt(t);
        if (r && "root" == r.providedIn)
          return void 0 === r.value ? (r.value = r.factory()) : r.value;
        if (n & st.Optional) return null;
        if (void 0 !== e) return e;
        throw new Error(`Injector: NOT_FOUND [${mt(t)}]`);
      }
      function Bt(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = _t(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length)
              throw new Error("Arguments array must have arguments.");
            let t = void 0,
              n = st.Default;
            for (let e = 0; e < r.length; e++) {
              const s = r[e];
              s instanceof et || "Optional" === s.ngMetadataName || s === et
                ? (n |= st.Optional)
                : s instanceof rt || "SkipSelf" === s.ngMetadataName || s === rt
                ? (n |= st.SkipSelf)
                : s instanceof nt || "Self" === s.ngMetadataName || s === nt
                ? (n |= st.Self)
                : (t = s instanceof tt || s === tt ? s.token : s);
            }
            e.push(Vt(t, n));
          } else e.push(Vt(r));
        }
        return e;
      }
      class Gt {
        get(t, e = Ut) {
          if (e === Ut) {
            const e = new Error(`NullInjectorError: No provider for ${mt(t)}!`);
            throw ((e.name = "NullInjectorError"), e);
          }
          return e;
        }
      }
      class Wt {}
      class Zt {}
      function Qt(t, e) {
        t.forEach((t) => (Array.isArray(t) ? Qt(t, e) : e(t)));
      }
      function Kt(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function Jt(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      var Yt = (function (t) {
          return (
            (t[(t.OnPush = 0)] = "OnPush"), (t[(t.Default = 1)] = "Default"), t
          );
        })({}),
        Xt = (function (t) {
          return (
            (t[(t.Emulated = 0)] = "Emulated"),
            (t[(t.Native = 1)] = "Native"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            t
          );
        })({});
      const te = {},
        ee = [];
      let ne = 0;
      function re(t) {
        return Y(() => {
          const e = {},
            n = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === Yt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || ee,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || Xt.Emulated,
              id: "c",
              styles: t.styles || ee,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            r = t.directives,
            s = t.features,
            o = t.pipes;
          return (
            (n.id += ne++),
            (n.inputs = le(t.inputs, e)),
            (n.outputs = le(t.outputs)),
            s && s.forEach((t) => t(n)),
            (n.directiveDefs = r
              ? () => ("function" == typeof r ? r() : r).map(se)
              : null),
            (n.pipeDefs = o
              ? () => ("function" == typeof o ? o() : o).map(oe)
              : null),
            n
          );
        });
      }
      function se(t) {
        return (
          ue(t) ||
          (function (t) {
            return t[kt] || null;
          })(t)
        );
      }
      function oe(t) {
        return (function (t) {
          return t[At] || null;
        })(t);
      }
      const ie = {};
      function ae(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || ee,
          declarations: t.declarations || ee,
          imports: t.imports || ee,
          exports: t.exports || ee,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        };
        return (
          null != t.id &&
            Y(() => {
              ie[t.id] = t.type;
            }),
          e
        );
      }
      function le(t, e) {
        if (null == t) return te;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let s = t[r],
              o = s;
            Array.isArray(s) && ((o = s[1]), (s = s[0])),
              (n[s] = r),
              e && (e[s] = o);
          }
        return n;
      }
      const ce = re;
      function ue(t) {
        return t[Tt] || null;
      }
      function he(t, e) {
        return t.hasOwnProperty(Ot) ? t[Ot] : null;
      }
      function de(t, e) {
        const n = t[Rt] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${mt(t)} does not have '\u0275mod' property.`);
        return n;
      }
      function pe(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function fe(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function ge(t) {
        return 0 != (8 & t.flags);
      }
      function me(t) {
        return 2 == (2 & t.flags);
      }
      function ye(t) {
        return 1 == (1 & t.flags);
      }
      function ve(t) {
        return null !== t.template;
      }
      function we(t) {
        return 0 != (512 & t[2]);
      }
      class _e {
        constructor(t, e, n) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function be() {
        return xe;
      }
      function xe(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = Ce), Se;
      }
      function Se() {
        const t = Ee(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === te) t.previous = e;
          else for (let t in e) n[t] = e[t];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function Ce(t, e, n, r) {
        const s =
            Ee(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: te, current: null }),
          o = s.current || (s.current = {}),
          i = s.previous,
          a = this.declaredInputs[n],
          l = i[a];
        (o[a] = new _e(l && l.currentValue, e, i === te)), (t[r] = e);
      }
      function Ee(t) {
        return t.__ngSimpleChanges__ || null;
      }
      be.ngInherit = !0;
      let Te = void 0;
      function ke(t) {
        return !!t.listen;
      }
      const Ae = {
        createRenderer: (t, e) =>
          void 0 !== Te
            ? Te
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function Re(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function Ie(t, e) {
        return Re(e[t.index]);
      }
      function Oe(t, e) {
        return t.data[e + 20];
      }
      function Pe(t, e) {
        const n = e[t];
        return pe(n) ? n : n[0];
      }
      function je(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function Ne(t) {
        return 128 == (128 & t[2]);
      }
      function Ue(t, e) {
        return null === t || null == e ? null : t[e];
      }
      function De(t) {
        t[18] = 0;
      }
      function He(t, e) {
        t[5] += e;
        let n = t,
          r = t[3];
        for (
          ;
          null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (r[5] += e), (n = r), (r = r[3]);
      }
      const Me = {
        lFrame: tn(null),
        bindingsEnabled: !0,
        checkNoChangesMode: !1,
      };
      function Le() {
        return Me.bindingsEnabled;
      }
      function Fe() {
        return Me.lFrame.lView;
      }
      function ze() {
        return Me.lFrame.tView;
      }
      function $e() {
        return Me.lFrame.previousOrParentTNode;
      }
      function Ve(t, e) {
        (Me.lFrame.previousOrParentTNode = t), (Me.lFrame.isParent = e);
      }
      function qe() {
        return Me.lFrame.isParent;
      }
      function Be() {
        return Me.checkNoChangesMode;
      }
      function Ge(t) {
        Me.checkNoChangesMode = t;
      }
      function We() {
        return Me.lFrame.bindingIndex++;
      }
      function Ze(t, e) {
        const n = Me.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), Qe(e);
      }
      function Qe(t) {
        Me.lFrame.currentDirectiveIndex = t;
      }
      function Ke(t) {
        Me.lFrame.currentQueryIndex = t;
      }
      function Je(t, e) {
        const n = Xe();
        (Me.lFrame = n), (n.previousOrParentTNode = e), (n.lView = t);
      }
      function Ye(t, e) {
        const n = Xe(),
          r = t[1];
        (Me.lFrame = n),
          (n.previousOrParentTNode = e),
          (n.lView = t),
          (n.tView = r),
          (n.contextLView = t),
          (n.bindingIndex = r.bindingStartIndex);
      }
      function Xe() {
        const t = Me.lFrame,
          e = null === t ? null : t.child;
        return null === e ? tn(t) : e;
      }
      function tn(t) {
        const e = {
          previousOrParentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: 0,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
        };
        return null !== t && (t.child = e), e;
      }
      function en() {
        const t = Me.lFrame;
        return (
          (Me.lFrame = t.parent),
          (t.previousOrParentTNode = null),
          (t.lView = null),
          t
        );
      }
      const nn = en;
      function rn() {
        const t = en();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = 0),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function sn() {
        return Me.lFrame.selectedIndex;
      }
      function on(t) {
        Me.lFrame.selectedIndex = t;
      }
      function an() {
        const t = Me.lFrame;
        return Oe(t.tView, t.selectedIndex);
      }
      function ln(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const e = t.data[n].type.prototype,
            {
              ngAfterContentInit: r,
              ngAfterContentChecked: s,
              ngAfterViewInit: o,
              ngAfterViewChecked: i,
              ngOnDestroy: a,
            } = e;
          r && (t.contentHooks || (t.contentHooks = [])).push(-n, r),
            s &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, s),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, s)),
            o && (t.viewHooks || (t.viewHooks = [])).push(-n, o),
            i &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, i),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, i)),
            null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a);
        }
      }
      function cn(t, e, n) {
        dn(t, e, 3, n);
      }
      function un(t, e, n, r) {
        (3 & t[2]) === n && dn(t, e, n, r);
      }
      function hn(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function dn(t, e, n, r) {
        const s = null != r ? r : -1;
        let o = 0;
        for (let i = void 0 !== r ? 65535 & t[18] : 0; i < e.length; i++)
          if ("number" == typeof e[i + 1]) {
            if (((o = e[i]), null != r && o >= r)) break;
          } else
            e[i] < 0 && (t[18] += 65536),
              (o < s || -1 == s) &&
                (pn(t, n, e, i), (t[18] = (4294901760 & t[18]) + i + 2)),
              i++;
      }
      function pn(t, e, n, r) {
        const s = n[r] < 0,
          o = n[r + 1],
          i = t[s ? -n[r] : n[r]];
        s
          ? t[2] >> 11 < t[18] >> 16 &&
            (3 & t[2]) === e &&
            ((t[2] += 2048), o.call(i))
          : o.call(i);
      }
      class fn {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function gn(t, e, n) {
        const r = ke(t);
        let s = 0;
        for (; s < n.length; ) {
          const o = n[s];
          if ("number" == typeof o) {
            if (0 !== o) break;
            s++;
            const i = n[s++],
              a = n[s++],
              l = n[s++];
            r ? t.setAttribute(e, a, l, i) : e.setAttributeNS(i, a, l);
          } else {
            const i = o,
              a = n[++s];
            yn(i)
              ? r && t.setProperty(e, i, a)
              : r
              ? t.setAttribute(e, i, a)
              : e.setAttribute(i, a),
              s++;
          }
        }
        return s;
      }
      function mn(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function yn(t) {
        return 64 === t.charCodeAt(0);
      }
      function vn(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let r = 0; r < e.length; r++) {
            const s = e[r];
            "number" == typeof s
              ? (n = s)
              : 0 === n ||
                wn(t, n, s, null, -1 === n || 2 === n ? e[++r] : null);
          }
        }
        return t;
      }
      function wn(t, e, n, r, s) {
        let o = 0,
          i = t.length;
        if (-1 === e) i = -1;
        else
          for (; o < t.length; ) {
            const n = t[o++];
            if ("number" == typeof n) {
              if (n === e) {
                i = -1;
                break;
              }
              if (n > e) {
                i = o - 1;
                break;
              }
            }
          }
        for (; o < t.length; ) {
          const e = t[o];
          if ("number" == typeof e) break;
          if (e === n) {
            if (null === r) return void (null !== s && (t[o + 1] = s));
            if (r === t[o + 1]) return void (t[o + 2] = s);
          }
          o++, null !== r && o++, null !== s && o++;
        }
        -1 !== i && (t.splice(i, 0, e), (o = i + 1)),
          t.splice(o++, 0, n),
          null !== r && t.splice(o++, 0, r),
          null !== s && t.splice(o++, 0, s);
      }
      function _n(t) {
        return -1 !== t;
      }
      function bn(t) {
        return 32767 & t;
      }
      function xn(t) {
        return t >> 16;
      }
      function Sn(t, e) {
        let n = xn(t),
          r = e;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      function Cn(t) {
        return "string" == typeof t ? t : null == t ? "" : "" + t;
      }
      function En(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : Cn(t);
      }
      const Tn = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(Et))();
      function kn(t) {
        return t instanceof Function ? t() : t;
      }
      let An = !0;
      function Rn(t) {
        const e = An;
        return (An = t), e;
      }
      let In = 0;
      function On(t, e) {
        const n = jn(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass &&
          ((t.injectorIndex = e.length),
          Pn(r.data, t),
          Pn(e, null),
          Pn(r.blueprint, null));
        const s = Nn(t, e),
          o = t.injectorIndex;
        if (_n(s)) {
          const t = bn(s),
            n = Sn(s, e),
            r = n[1].data;
          for (let s = 0; s < 8; s++) e[o + s] = n[t + s] | r[t + s];
        }
        return (e[o + 8] = s), o;
      }
      function Pn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function jn(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null == e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function Nn(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = e[6],
          r = 1;
        for (; n && -1 === n.injectorIndex; )
          (n = (e = e[15]) ? e[6] : null), r++;
        return n ? n.injectorIndex | (r << 16) : -1;
      }
      function Un(t, e, n) {
        !(function (t, e, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Pt) && (r = n[Pt]),
            null == r && (r = n[Pt] = In++);
          const s = 255 & r,
            o = 1 << s,
            i = 64 & s,
            a = 32 & s,
            l = e.data;
          128 & s
            ? i
              ? a
                ? (l[t + 7] |= o)
                : (l[t + 6] |= o)
              : a
              ? (l[t + 5] |= o)
              : (l[t + 4] |= o)
            : i
            ? a
              ? (l[t + 3] |= o)
              : (l[t + 2] |= o)
            : a
            ? (l[t + 1] |= o)
            : (l[t] |= o);
        })(t, e, n);
      }
      function Dn(t, e, n, r = st.Default, s) {
        if (null !== t) {
          const s = (function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(Pt) ? t[Pt] : void 0;
            return "number" == typeof e && e > 0 ? 255 & e : e;
          })(n);
          if ("function" == typeof s) {
            Je(e, t);
            try {
              const t = s();
              if (null != t || r & st.Optional) return t;
              throw new Error(`No provider for ${En(n)}!`);
            } finally {
              nn();
            }
          } else if ("number" == typeof s) {
            if (-1 === s) return new $n(t, e);
            let o = null,
              i = jn(t, e),
              a = -1,
              l = r & st.Host ? e[16][6] : null;
            for (
              (-1 === i || r & st.SkipSelf) &&
              ((a = -1 === i ? Nn(t, e) : e[i + 8]),
              zn(r, !1) ? ((o = e[1]), (i = bn(a)), (e = Sn(a, e))) : (i = -1));
              -1 !== i;

            ) {
              a = e[i + 8];
              const t = e[1];
              if (Fn(s, i, t.data)) {
                const t = Mn(i, e, n, o, r, l);
                if (t !== Hn) return t;
              }
              zn(r, e[1].data[i + 8] === l) && Fn(s, i, e)
                ? ((o = t), (i = bn(a)), (e = Sn(a, e)))
                : (i = -1);
            }
          }
        }
        if (
          (r & st.Optional && void 0 === s && (s = null),
          0 == (r & (st.Self | st.Host)))
        ) {
          const t = e[9],
            o = zt(void 0);
          try {
            return t ? t.get(n, s, r & st.Optional) : qt(n, s, r & st.Optional);
          } finally {
            zt(o);
          }
        }
        if (r & st.Optional) return s;
        throw new Error(`NodeInjector: NOT_FOUND [${En(n)}]`);
      }
      const Hn = {};
      function Mn(t, e, n, r, s, o) {
        const i = e[1],
          a = i.data[t + 8],
          l = (function (t, e, n, r, s) {
            const o = t.providerIndexes,
              i = e.data,
              a = 1048575 & o,
              l = t.directiveStart,
              c = o >> 20,
              u = s ? a + c : t.directiveEnd;
            for (let h = r ? a : a + c; h < u; h++) {
              const t = i[h];
              if ((h < l && n === t) || (h >= l && t.type === n)) return h;
            }
            if (s) {
              const t = i[l];
              if (t && ve(t) && t.type === n) return l;
            }
            return null;
          })(
            a,
            i,
            n,
            null == r ? me(a) && An : r != i && 3 === a.type,
            s & st.Host && o === a
          );
        return null !== l ? Ln(e, i, l, a) : Hn;
      }
      function Ln(t, e, n, r) {
        let s = t[n];
        const o = e.data;
        if (s instanceof fn) {
          const i = s;
          if (i.resolving) throw new Error("Circular dep for " + En(o[n]));
          const a = Rn(i.canSeeViewProviders);
          let l;
          (i.resolving = !0), i.injectImpl && (l = zt(i.injectImpl)), Je(t, r);
          try {
            (s = t[n] = i.factory(void 0, o, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function (t, e, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: s,
                    ngDoCheck: o,
                  } = e.type.prototype;
                  if (r) {
                    const r = xe(e);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, r);
                  }
                  s &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s),
                    o &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, o),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, o));
                })(n, o[n], e);
          } finally {
            i.injectImpl && zt(l), Rn(a), (i.resolving = !1), nn();
          }
        }
        return s;
      }
      function Fn(t, e, n) {
        const r = 64 & t,
          s = 32 & t;
        let o;
        return (
          (o =
            128 & t
              ? r
                ? s
                  ? n[e + 7]
                  : n[e + 6]
                : s
                ? n[e + 5]
                : n[e + 4]
              : r
              ? s
                ? n[e + 3]
                : n[e + 2]
              : s
              ? n[e + 1]
              : n[e]),
          !!(o & (1 << t))
        );
      }
      function zn(t, e) {
        return !(t & st.Self || (t & st.Host && e));
      }
      class $n {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return Dn(this._tNode, this._lView, t, void 0, e);
        }
      }
      function Vn(t) {
        return t.ngDebugContext;
      }
      function qn(t) {
        return t.ngOriginalError;
      }
      function Bn(t, ...e) {
        t.error(...e);
      }
      class Gn {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            r = (function (t) {
              return t.ngErrorLogger || Bn;
            })(t);
          r(this._console, "ERROR", t),
            e && r(this._console, "ORIGINAL ERROR", e),
            n && r(this._console, "ERROR CONTEXT", n);
        }
        _findContext(t) {
          return t ? (Vn(t) ? Vn(t) : this._findContext(qn(t))) : null;
        }
        _findOriginalError(t) {
          let e = qn(t);
          for (; e && qn(e); ) e = qn(e);
          return e;
        }
      }
      class Wn {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return (
            "SafeValue must use [property]=binding: " +
            this.changingThisBreaksApplicationSecurity +
            " (see http://g.co/ng/security#xss)"
          );
        }
      }
      let Zn = !0,
        Qn = !1;
      function Kn() {
        return (Qn = !0), Zn;
      }
      const Jn = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        Yn = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      var Xn = (function (t) {
        return (
          (t[(t.NONE = 0)] = "NONE"),
          (t[(t.HTML = 1)] = "HTML"),
          (t[(t.STYLE = 2)] = "STYLE"),
          (t[(t.SCRIPT = 3)] = "SCRIPT"),
          (t[(t.URL = 4)] = "URL"),
          (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
          t
        );
      })({});
      function tr(t) {
        const e = (function () {
          const t = Fe();
          return t && t[12];
        })();
        return e
          ? e.sanitize(Xn.URL, t) || ""
          : (function (t, e) {
              const n = (function (t) {
                return (t instanceof Wn && t.getTypeName()) || null;
              })(t);
              if (null != n && n !== e) {
                if ("ResourceURL" === n && "URL" === e) return !0;
                throw new Error(
                  `Required a safe ${e}, got a ${n} (see http://g.co/ng/security#xss)`
                );
              }
              return n === e;
            })(t, "URL")
          ? (r = t) instanceof Wn
            ? r.changingThisBreaksApplicationSecurity
            : r
          : ((n = Cn(t)),
            (n = String(n)).match(Jn) || n.match(Yn)
              ? n
              : (Kn() &&
                  console.warn(
                    `WARNING: sanitizing unsafe URL value ${n} (see http://g.co/ng/security#xss)`
                  ),
                "unsafe:" + n));
        var n, r;
      }
      function er(t, e) {
        t.__ngContext__ = e;
      }
      function nr(t) {
        throw new Error(
          "Multiple components match node with tagname " + t.tagName
        );
      }
      function rr() {
        throw new Error("Cannot mix multi providers and regular providers");
      }
      function sr(t, e, n) {
        let r = t.length;
        for (;;) {
          const s = t.indexOf(e, n);
          if (-1 === s) return s;
          if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const n = e.length;
            if (s + n === r || t.charCodeAt(s + n) <= 32) return s;
          }
          n = s + 1;
        }
      }
      function or(t, e, n) {
        let r = 0;
        for (; r < t.length; ) {
          let s = t[r++];
          if (n && "class" === s) {
            if (((s = t[r]), -1 !== sr(s.toLowerCase(), e, 0))) return !0;
          } else if (1 === s) {
            for (; r < t.length && "string" == typeof (s = t[r++]); )
              if (s.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function ir(t) {
        return 0 === t.type && "ng-template" !== t.tagName;
      }
      function ar(t, e, n) {
        return e === (0 !== t.type || n ? t.tagName : "ng-template");
      }
      function lr(t, e, n) {
        let r = 4;
        const s = t.attrs || [],
          o = (function (t) {
            for (let e = 0; e < t.length; e++) if (mn(t[e])) return e;
            return t.length;
          })(s);
        let i = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!i)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !ar(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (cr(r)) return !1;
                  i = !0;
                }
              } else {
                const c = 8 & r ? l : e[++a];
                if (8 & r && null !== t.attrs) {
                  if (!or(t.attrs, c, n)) {
                    if (cr(r)) return !1;
                    i = !0;
                  }
                  continue;
                }
                const u = ur(8 & r ? "class" : l, s, ir(t), n);
                if (-1 === u) {
                  if (cr(r)) return !1;
                  i = !0;
                  continue;
                }
                if ("" !== c) {
                  let t;
                  t = u > o ? "" : s[u + 1].toLowerCase();
                  const e = 8 & r ? t : null;
                  if ((e && -1 !== sr(e, c, 0)) || (2 & r && c !== t)) {
                    if (cr(r)) return !1;
                    i = !0;
                  }
                }
              }
          } else {
            if (!i && !cr(r) && !cr(l)) return !1;
            if (i && cr(l)) continue;
            (i = !1), (r = l | (1 & r));
          }
        }
        return cr(r) || i;
      }
      function cr(t) {
        return 0 == (1 & t);
      }
      function ur(t, e, n, r) {
        if (null === e) return -1;
        let s = 0;
        if (r || !n) {
          let n = !1;
          for (; s < e.length; ) {
            const r = e[s];
            if (r === t) return s;
            if (3 === r || 6 === r) n = !0;
            else {
              if (1 === r || 2 === r) {
                let t = e[++s];
                for (; "string" == typeof t; ) t = e[++s];
                continue;
              }
              if (4 === r) break;
              if (0 === r) {
                s += 4;
                continue;
              }
            }
            s += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n];
              if ("number" == typeof r) return -1;
              if (r === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function hr(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (lr(t, e[r], n)) return !0;
        return !1;
      }
      function dr(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function pr(t) {
        let e = t[0],
          n = 1,
          r = 2,
          s = "",
          o = !1;
        for (; n < t.length; ) {
          let i = t[n];
          if ("string" == typeof i)
            if (2 & r) {
              const e = t[++n];
              s += "[" + i + (e.length > 0 ? '="' + e + '"' : "") + "]";
            } else 8 & r ? (s += "." + i) : 4 & r && (s += " " + i);
          else
            "" === s || cr(i) || ((e += dr(o, s)), (s = "")),
              (r = i),
              (o = o || !cr(r));
          n++;
        }
        return "" !== s && (e += dr(o, s)), e;
      }
      const fr = {};
      function gr(t) {
        const e = t[3];
        return fe(e) ? e[3] : e;
      }
      function mr(t) {
        return vr(t[13]);
      }
      function yr(t) {
        return vr(t[4]);
      }
      function vr(t) {
        for (; null !== t && !fe(t); ) t = t[4];
        return t;
      }
      function wr(t) {
        _r(ze(), Fe(), sn() + t, Be());
      }
      function _r(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const r = t.preOrderCheckHooks;
            null !== r && cn(e, r, n);
          } else {
            const r = t.preOrderHooks;
            null !== r && un(e, r, 0, n);
          }
        on(n);
      }
      function br(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const s = n[r],
              o = n[r + 1];
            if (-1 !== o) {
              const n = t.data[o];
              Ke(s), n.contentQueries(2, e[o], o);
            }
          }
      }
      function xr(t, e, n) {
        return ke(e)
          ? e.createElement(t, n)
          : null === n
          ? e.createElement(t)
          : e.createElementNS(n, t);
      }
      function Sr(t, e, n, r, s, o, i, a, l, c) {
        const u = e.blueprint.slice();
        return (
          (u[0] = s),
          (u[2] = 140 | r),
          De(u),
          (u[3] = u[15] = t),
          (u[8] = n),
          (u[10] = i || (t && t[10])),
          (u[11] = a || (t && t[11])),
          (u[12] = l || (t && t[12]) || null),
          (u[9] = c || (t && t[9]) || null),
          (u[6] = o),
          (u[16] = 2 == e.type ? t[16] : u),
          u
        );
      }
      function Cr(t, e, n, r, s, o) {
        const i = n + 20,
          a =
            t.data[i] ||
            (function (t, e, n, r, s, o) {
              const i = $e(),
                a = qe(),
                l = a ? i : i && i.parent,
                c = (t.data[n] = Or(0, l && l !== e ? l : null, r, n, s, o));
              return (
                null === t.firstChild && (t.firstChild = c),
                i &&
                  (!a || null != i.child || (null === c.parent && 2 !== i.type)
                    ? a || (i.next = c)
                    : (i.child = c)),
                c
              );
            })(t, e, i, r, s, o);
        return Ve(a, !0), a;
      }
      function Er(t, e, n) {
        Ye(e, e[6]);
        try {
          const r = t.viewQuery;
          null !== r && Kr(1, r, n);
          const s = t.template;
          null !== s && Ar(t, e, s, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && br(t, e),
            t.staticViewQueries && Kr(2, t.viewQuery, n);
          const o = t.components;
          null !== o &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Br(t, e[n]);
            })(e, o);
        } catch (r) {
          throw (t.firstCreatePass && (t.incompleteFirstPass = !0), r);
        } finally {
          (e[2] &= -5), rn();
        }
      }
      function Tr(t, e, n, r) {
        const s = e[2];
        if (256 == (256 & s)) return;
        Ye(e, e[6]);
        const o = Be();
        try {
          De(e),
            (Me.lFrame.bindingIndex = t.bindingStartIndex),
            null !== n && Ar(t, e, n, 2, r);
          const i = 3 == (3 & s);
          if (!o)
            if (i) {
              const n = t.preOrderCheckHooks;
              null !== n && cn(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && un(e, n, 0, null), hn(e, 0);
            }
          if (
            ((function (t) {
              for (let e = mr(t); null !== e; e = yr(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    r = n[3];
                  0 == (1024 & n[2]) && He(r, 1), (n[2] |= 1024);
                }
              }
            })(e),
            (function (t) {
              for (let e = mr(t); null !== e; e = yr(e))
                for (let t = 10; t < e.length; t++) {
                  const n = e[t],
                    r = n[1];
                  Ne(n) && Tr(r, n, r.template, n[8]);
                }
            })(e),
            null !== t.contentQueries && br(t, e),
            !o)
          )
            if (i) {
              const n = t.contentCheckHooks;
              null !== n && cn(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && un(e, n, 1), hn(e, 1);
            }
          !(function (t, e) {
            try {
              const n = t.expandoInstructions;
              if (null !== n) {
                let r = t.expandoStartIndex,
                  s = -1,
                  o = -1;
                for (let t = 0; t < n.length; t++) {
                  const i = n[t];
                  "number" == typeof i
                    ? i <= 0
                      ? ((o = 0 - i), on(o), (r += 9 + n[++t]), (s = r))
                      : (r += i)
                    : (null !== i && (Ze(r, s), i(2, e[s])), s++);
                }
              }
            } finally {
              on(-1);
            }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) qr(t, e[n]);
            })(e, a);
          const l = t.viewQuery;
          if ((null !== l && Kr(2, l, r), !o))
            if (i) {
              const n = t.viewCheckHooks;
              null !== n && cn(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && un(e, n, 2), hn(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            o || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), He(e[3], -1));
        } finally {
          rn();
        }
      }
      function kr(t, e, n, r) {
        const s = e[10],
          o = !Be(),
          i = 4 == (4 & e[2]);
        try {
          o && !i && s.begin && s.begin(), i && Er(t, e, r), Tr(t, e, n, r);
        } finally {
          o && !i && s.end && s.end();
        }
      }
      function Ar(t, e, n, r, s) {
        const o = sn();
        try {
          on(-1), 2 & r && e.length > 20 && _r(t, e, 0, Be()), n(r, s);
        } finally {
          on(o);
        }
      }
      function Rr(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = Ir(
              1,
              -1,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function Ir(t, e, n, r, s, o, i, a, l, c) {
        const u = 20 + r,
          h = u + s,
          d = (function (t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : fr);
            return n;
          })(u, h);
        return (d[1] = {
          type: t,
          id: e,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          node: null,
          data: d.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: h,
          expandoInstructions: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof i ? i() : i,
          firstChild: null,
          schemas: l,
          consts: c,
          incompleteFirstPass: !1,
        });
      }
      function Or(t, e, n, r, s, o) {
        return {
          type: n,
          index: r,
          injectorIndex: e ? e.injectorIndex : -1,
          directiveStart: -1,
          directiveEnd: -1,
          directiveStylingLast: -1,
          propertyBindings: null,
          flags: 0,
          providerIndexes: 0,
          tagName: s,
          attrs: o,
          mergedAttrs: null,
          localNames: null,
          initialInputs: void 0,
          inputs: null,
          outputs: null,
          tViews: null,
          next: null,
          projectionNext: null,
          child: null,
          parent: e,
          projection: null,
          styles: null,
          stylesWithoutHost: null,
          residualStyles: void 0,
          classes: null,
          classesWithoutHost: null,
          residualClasses: void 0,
          classBindings: 0,
          styleBindings: 0,
        };
      }
      function Pr(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const s = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(e, s)
              : (n[r] = [e, s]);
          }
        return n;
      }
      function jr(t, e) {
        const n = t.expandoInstructions;
        n.push(e.hostBindings), 0 !== e.hostVars && n.push(e.hostVars);
      }
      function Nr(t, e, n) {
        for (let r = 0; r < n; r++)
          e.push(fr), t.blueprint.push(fr), t.data.push(null);
      }
      function Ur(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function Dr(t, e, n) {
        const r = 20 - e.index,
          s = t.data.length - (1048575 & e.providerIndexes);
        (t.expandoInstructions || (t.expandoInstructions = [])).push(r, s, n);
      }
      function Hr(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function Mr(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          ve(e) && (n[""] = t);
        }
      }
      function Lr(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function Fr(t, e, n) {
        t.data.push(n);
        const r = n.factory || (n.factory = he(n.type)),
          s = new fn(r, ve(n), null);
        t.blueprint.push(s), e.push(s);
      }
      function zr(t, e, n) {
        const r = Ie(e, t),
          s = Rr(n),
          o = t[10],
          i = Gr(
            t,
            Sr(t, s, null, n.onPush ? 64 : 16, r, e, o, o.createRenderer(r, n))
          );
        t[e.index] = i;
      }
      function $r(t, e, n, r, s, o) {
        const i = o[e];
        if (null !== i) {
          const t = r.setInput;
          for (let e = 0; e < i.length; ) {
            const s = i[e++],
              o = i[e++],
              a = i[e++];
            null !== t ? r.setInput(n, a, s, o) : (n[o] = a);
          }
        }
      }
      function Vr(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length; ) {
          const s = e[r];
          if (0 !== s)
            if (5 !== s) {
              if ("number" == typeof s) break;
              t.hasOwnProperty(s) &&
                (null === n && (n = []), n.push(s, t[s], e[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function qr(t, e) {
        const n = Pe(e, t);
        if (Ne(n)) {
          const t = n[1];
          80 & n[2]
            ? Tr(t, n, t.template, n[8])
            : n[5] > 0 &&
              (function t(e) {
                for (let r = mr(e); null !== r; r = yr(r))
                  for (let e = 10; e < r.length; e++) {
                    const n = r[e];
                    if (1024 & n[2]) {
                      const t = n[1];
                      Tr(t, n, t.template, n[8]);
                    } else n[5] > 0 && t(n);
                  }
                const n = e[1].components;
                if (null !== n)
                  for (let r = 0; r < n.length; r++) {
                    const s = Pe(n[r], e);
                    Ne(s) && s[5] > 0 && t(s);
                  }
              })(n);
        }
      }
      function Br(t, e) {
        const n = Pe(e, t),
          r = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(r, n),
          Er(r, n, n[8]);
      }
      function Gr(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function Wr(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = gr(t);
          if (we(t) && !e) return t;
          t = e;
        }
        return null;
      }
      function Zr(t, e, n) {
        const r = e[10];
        r.begin && r.begin();
        try {
          Tr(t, e, t.template, n);
        } catch (s) {
          throw (Xr(e, s), s);
        } finally {
          r.end && r.end();
        }
      }
      function Qr(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = je(n),
              s = r[1];
            kr(s, r, s.template, n);
          }
        })(t[8]);
      }
      function Kr(t, e, n) {
        Ke(0), e(t, n);
      }
      const Jr = (() => Promise.resolve(null))();
      function Yr(t) {
        return t[7] || (t[7] = []);
      }
      function Xr(t, e) {
        const n = t[9],
          r = n ? n.get(Gn, null) : null;
        r && r.handleError(e);
      }
      function ts(t, e, n, r, s) {
        for (let o = 0; o < n.length; ) {
          const i = n[o++],
            a = n[o++],
            l = e[i],
            c = t.data[i];
          null !== c.setInput ? c.setInput(l, s, r, a) : (l[a] = s);
        }
      }
      function es(t, e) {
        const n = e[3];
        return -1 === t.index ? (fe(n) ? n : null) : n;
      }
      function ns(t, e) {
        const n = es(t, e);
        return n ? ps(e[11], n[7]) : null;
      }
      function rs(t, e, n, r, s) {
        if (null != r) {
          let o,
            i = !1;
          fe(r) ? (o = r) : pe(r) && ((i = !0), (r = r[0]));
          const a = Re(r);
          0 === t && null !== n
            ? null == s
              ? hs(e, n, a)
              : us(e, n, a, s || null)
            : 1 === t && null !== n
            ? us(e, n, a, s || null)
            : 2 === t
            ? (function (t, e, n) {
                const r = ps(t, e);
                r &&
                  (function (t, e, n, r) {
                    ke(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                  })(t, r, e, n);
              })(e, a, i)
            : 3 === t && e.destroyNode(a),
            null != o &&
              (function (t, e, n, r, s) {
                const o = n[7];
                o !== Re(n) && rs(e, t, r, o, s);
                for (let i = 10; i < n.length; i++) {
                  const s = n[i];
                  ys(s[1], s, t, e, r, o);
                }
              })(e, t, o, n, s);
        }
      }
      function ss(t, e, n, r) {
        const s = ns(t.node, e);
        s && ys(t, e, e[11], n ? 1 : 2, s, r);
      }
      function os(t, e) {
        const n = t[9],
          r = n.indexOf(e);
        1024 & e[2] && He(e[3], -1), n.splice(r, 1);
      }
      function is(t, e) {
        if (t.length <= 10) return;
        const n = 10 + e,
          r = t[n];
        if (r) {
          const s = r[17];
          null !== s && s !== t && os(s, r), e > 0 && (t[n - 1][4] = r[4]);
          const o = Jt(t, 10 + e);
          ss(r[1], r, !1, null);
          const i = o[19];
          null !== i && i.detachView(o[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function as(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          ke(n) && n.destroyNode && ys(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return cs(t[1], t);
              for (; e; ) {
                let n = null;
                if (pe(e)) n = e[13];
                else {
                  const t = e[10];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    pe(e) && cs(e[1], e), (e = ls(e, t));
                  null === e && (e = t), pe(e) && cs(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function ls(t, e) {
        let n;
        return pe(t) && (n = t[6]) && 2 === n.type
          ? es(n, t)
          : t[3] === e
          ? null
          : t[3];
      }
      function cs(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const t = e[n[r]];
                  if (!(t instanceof fn)) {
                    const e = n[r + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2)
                        e[n + 1].call(t[e[n]]);
                    else e.call(t);
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup;
              if (null !== n) {
                const t = e[7];
                for (let r = 0; r < n.length - 1; r += 2)
                  if ("string" == typeof n[r]) {
                    const s = n[r + 1],
                      o = "function" == typeof s ? s(e) : Re(e[s]),
                      i = t[n[r + 2]],
                      a = n[r + 3];
                    "boolean" == typeof a
                      ? o.removeEventListener(n[r], i, a)
                      : a >= 0
                      ? t[a]()
                      : t[-a].unsubscribe(),
                      (r += 2);
                  } else n[r].call(t[n[r + 1]]);
                e[7] = null;
              }
            })(t, e);
          const n = e[6];
          n && 3 === n.type && ke(e[11]) && e[11].destroy();
          const r = e[17];
          if (null !== r && fe(e[3])) {
            r !== e[3] && os(r, e);
            const n = e[19];
            null !== n && n.detachView(t);
          }
        }
      }
      function us(t, e, n, r) {
        ke(t) ? t.insertBefore(e, n, r) : e.insertBefore(n, r, !0);
      }
      function hs(t, e, n) {
        ke(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function ds(t, e, n, r) {
        null !== r ? us(t, e, n, r) : hs(t, e, n);
      }
      function ps(t, e) {
        return ke(t) ? t.parentNode(e) : e.parentNode;
      }
      function fs(t, e, n, r) {
        const s = (function (t, e, n) {
          let r = e.parent;
          for (; null != r && (4 === r.type || 5 === r.type); )
            r = (e = r).parent;
          if (null == r) {
            const t = n[6];
            return 2 === t.type ? ns(t, n) : n[0];
          }
          if (e && 5 === e.type && 4 & e.flags) return Ie(e, n).parentNode;
          if (2 & r.flags) {
            const e = t.data,
              n = e[e[r.index].directiveStart].encapsulation;
            if (n !== Xt.ShadowDom && n !== Xt.Native) return null;
          }
          return Ie(r, n);
        })(t, r, e);
        if (null != s) {
          const t = e[11],
            o = (function (t, e) {
              if (2 === t.type) {
                const n = es(t, e);
                return null === n ? null : gs(n.indexOf(e, 10) - 10, n);
              }
              return 4 === t.type || 5 === t.type ? Ie(t, e) : null;
            })(r.parent || e[6], e);
          if (Array.isArray(n))
            for (let e = 0; e < n.length; e++) ds(t, s, n[e], o);
          else ds(t, s, n, o);
        }
      }
      function gs(t, e) {
        const n = 10 + t + 1;
        if (n < e.length) {
          const t = e[n],
            r = t[1].firstChild;
          if (null !== r)
            return (function t(e, n) {
              if (null !== n) {
                const r = n.type;
                if (3 === r) return Ie(n, e);
                if (0 === r) return gs(-1, e[n.index]);
                if (4 === r || 5 === r) {
                  const r = n.child;
                  if (null !== r) return t(e, r);
                  {
                    const t = e[n.index];
                    return fe(t) ? gs(-1, t) : Re(t);
                  }
                }
                {
                  const r = e[16],
                    s = r[6],
                    o = gr(r),
                    i = s.projection[n.projection];
                  return null != i ? t(o, i) : t(e, n.next);
                }
              }
              return null;
            })(t, r);
        }
        return e[7];
      }
      function ms(t, e, n, r, s, o, i) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          i && 0 === e && (a && er(Re(a), r), (n.flags |= 4)),
            64 != (64 & n.flags) &&
              (4 === l || 5 === l
                ? (ms(t, e, n.child, r, s, o, !1), rs(e, t, s, a, o))
                : 1 === l
                ? vs(t, e, r, n, s, o)
                : rs(e, t, s, a, o)),
            (n = i ? n.projectionNext : n.next);
        }
      }
      function ys(t, e, n, r, s, o) {
        ms(n, r, t.node.child, e, s, o, !1);
      }
      function vs(t, e, n, r, s, o) {
        const i = n[16],
          a = i[6].projection[r.projection];
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) rs(e, t, s, a[l], o);
        else ms(t, e, a, i[3], s, o, !0);
      }
      function ws(t, e, n) {
        ke(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function _s(t, e, n) {
        ke(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      class bs {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._viewContainerRef = null);
        }
        get rootNodes() {
          const t = this._lView;
          return null == t[0]
            ? (function t(e, n, r, s, o = !1) {
                for (; null !== r; ) {
                  const i = n[r.index];
                  if ((null !== i && s.push(Re(i)), fe(i)))
                    for (let e = 10; e < i.length; e++) {
                      const n = i[e],
                        r = n[1].firstChild;
                      null !== r && t(n[1], n, r, s);
                    }
                  const a = r.type;
                  if (4 === a || 5 === a) t(e, n, r.child, s);
                  else if (1 === a) {
                    const e = n[16],
                      o = e[6].projection[r.projection];
                    if (Array.isArray(o)) s.push(...o);
                    else {
                      const n = gr(e);
                      t(n[1], n, o, s, !0);
                    }
                  }
                  r = o ? r.projectionNext : r.next;
                }
                return s;
              })(t[1], t, t[6].child, [])
            : [];
        }
        get context() {
          return this._lView[8];
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._viewContainerRef) {
            const t = this._viewContainerRef.indexOf(this);
            t > -1 && this._viewContainerRef.detach(t),
              (this._viewContainerRef = null);
          }
          as(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function (t, e, n, r) {
            const s = Yr(e);
            s.push(null),
              t.firstCreatePass &&
                (function (t) {
                  return t.cleanup || (t.cleanup = []);
                })(t).push(r, s.length - 1);
          })(this._lView[1], this._lView, 0, t);
        }
        markForCheck() {
          Wr(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          Zr(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            Ge(!0);
            try {
              Zr(t, e, n);
            } finally {
              Ge(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef(t) {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._viewContainerRef = t;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null),
            ys(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._viewContainerRef)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = t;
        }
      }
      class xs extends bs {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          Qr(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            Ge(!0);
            try {
              Qr(t);
            } finally {
              Ge(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      let Ss, Cs;
      function Es(t, e, n) {
        return Ss || (Ss = class extends t {}), new Ss(Ie(e, n));
      }
      let Ts = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => ks()), t;
      })();
      const ks = function (t = !1) {
          return (function (t, e, n) {
            if (!n && me(t)) {
              const n = Pe(t.index, e);
              return new bs(n, n);
            }
            return 3 === t.type || 0 === t.type || 4 === t.type || 5 === t.type
              ? new bs(e[16], e)
              : null;
          })($e(), Fe(), t);
        },
        As = Function,
        Rs = new jt("Set Injector scope."),
        Is = {},
        Os = {},
        Ps = [];
      let js = void 0;
      function Ns() {
        return void 0 === js && (js = new Gt()), js;
      }
      function Us(t, e = null, n = null, r) {
        return new Ds(t, n, e || Ns(), r);
      }
      class Ds {
        constructor(t, e, n, r = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          e && Qt(e, (n) => this.processProvider(n, t, e)),
            Qt([t], (t) => this.processInjectorType(t, [], s)),
            this.records.set(Nt, Ms(void 0, this));
          const o = this.records.get(Rs);
          (this.scope = null != o ? o.value : null),
            (this.source = r || ("object" == typeof t ? null : mt(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, e = Ut, n = st.Default) {
          this.assertNotDestroyed();
          const r = Ft(this);
          try {
            if (!(n & st.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ("function" == typeof (s = t) ||
                    ("object" == typeof s && s instanceof jt)) &&
                  lt(t);
                (e = n && this.injectableDefInScope(n) ? Ms(Hs(t), Is) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & st.Self ? Ns() : this.parent).get(
              t,
              (e = n & st.Optional && e === Ut ? null : e)
            );
          } catch (o) {
            if ("NullInjectorError" === o.name) {
              if (
                ((o.ngTempTokenPath = o.ngTempTokenPath || []).unshift(mt(t)),
                r)
              )
                throw o;
              return (function (t, e, n, r) {
                const s = t.ngTempTokenPath;
                throw (
                  (e.__source && s.unshift(e.__source),
                  (t.message = (function (t, e, n, r = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.substr(2)
                        : t;
                    let s = mt(e);
                    if (Array.isArray(e)) s = e.map(mt).join(" -> ");
                    else if ("object" == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let r = e[n];
                          t.push(
                            n +
                              ":" +
                              ("string" == typeof r ? JSON.stringify(r) : mt(r))
                          );
                        }
                      s = `{${t.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${t.replace(
                      Dt,
                      "\n  "
                    )}`;
                  })("\n" + t.message, s, n, r)),
                  (t.ngTokenPath = s),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(o, t, "R3InjectorError", this.source);
            }
            throw o;
          } finally {
            Ft(r);
          }
          var s;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((e, n) => t.push(mt(n))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(t, e, n) {
          if (!(t = _t(t))) return !1;
          let r = ut(t);
          const s = (null == r && t.ngModule) || void 0,
            o = void 0 === s ? t : s,
            i = -1 !== n.indexOf(o);
          if ((void 0 !== s && (r = ut(s)), null == r)) return !1;
          if (null != r.imports && !i) {
            let t;
            n.push(o);
            try {
              Qt(r.imports, (r) => {
                this.processInjectorType(r, e, n) &&
                  (void 0 === t && (t = []), t.push(r));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: r } = t[e];
                Qt(r, (t) => this.processProvider(t, n, r || Ps));
              }
          }
          this.injectorDefTypes.add(o), this.records.set(o, Ms(r.factory, Is));
          const a = r.providers;
          if (null != a && !i) {
            const e = t;
            Qt(a, (t) => this.processProvider(t, e, a));
          }
          return void 0 !== s && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let r = Fs((t = _t(t))) ? t : _t(t && t.provide);
          const s = (function (t, e, n) {
            return Ls(t)
              ? Ms(void 0, t.useValue)
              : Ms(
                  (function (t, e, n) {
                    let r = void 0;
                    if (Fs(t)) {
                      const e = _t(t);
                      return he(e) || Hs(e);
                    }
                    if (Ls(t)) r = () => _t(t.useValue);
                    else if ((s = t) && s.useFactory)
                      r = () => t.useFactory(...Bt(t.deps || []));
                    else if (
                      (function (t) {
                        return !(!t || !t.useExisting);
                      })(t)
                    )
                      r = () => Vt(_t(t.useExisting));
                    else {
                      const s = _t(t && (t.useClass || t.provide));
                      if (
                        (s ||
                          (function (t, e, n) {
                            let r = "";
                            throw (
                              (t &&
                                e &&
                                (r = ` - only instances of Provider and Type are allowed, got: [${e
                                  .map((t) => (t == n ? "?" + n + "?" : "..."))
                                  .join(", ")}]`),
                              new Error(
                                `Invalid provider for the NgModule '${mt(t)}'` +
                                  r
                              ))
                            );
                          })(e, n, t),
                        !(function (t) {
                          return !!t.deps;
                        })(t))
                      )
                        return he(s) || Hs(s);
                      r = () => new s(...Bt(t.deps));
                    }
                    var s;
                    return r;
                  })(t, e, n),
                  Is
                );
          })(t, e, n);
          if (Fs(t) || !0 !== t.multi) {
            const t = this.records.get(r);
            t && void 0 !== t.multi && rr();
          } else {
            let e = this.records.get(r);
            e
              ? void 0 === e.multi && rr()
              : ((e = Ms(void 0, Is, !0)),
                (e.factory = () => Bt(e.multi)),
                this.records.set(r, e)),
              (r = t),
              e.multi.push(t);
          }
          this.records.set(r, s);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === Os
              ? (function (t) {
                  throw new Error("Cannot instantiate cyclic dependency! " + t);
                })(mt(t))
              : e.value === Is && ((e.value = Os), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          return (
            !!t.providedIn &&
            ("string" == typeof t.providedIn
              ? "any" === t.providedIn || t.providedIn === this.scope
              : this.injectorDefTypes.has(t.providedIn))
          );
        }
      }
      function Hs(t) {
        const e = lt(t),
          n = null !== e ? e.factory : he(t);
        if (null !== n) return n;
        const r = ut(t);
        if (null !== r) return r.factory;
        if (t instanceof jt)
          throw new Error(`Token ${mt(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = (function (t, e) {
                const n = [];
                for (let r = 0; r < t; r++) n.push("?");
                return n;
              })(e);
              throw new Error(
                `Can't resolve all parameters for ${mt(t)}: (${n.join(", ")}).`
              );
            }
            const n = (function (t) {
              const e = t && (t[ht] || t[ft] || (t[pt] && t[pt]()));
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error("unreachable");
      }
      function Ms(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function Ls(t) {
        return null !== t && "object" == typeof t && Ht in t;
      }
      function Fs(t) {
        return "function" == typeof t;
      }
      const zs = function (t, e, n) {
        return (function (t, e = null, n = null, r) {
          const s = Us(t, e, n, r);
          return s._resolveInjectorDefTypes(), s;
        })({ name: n }, e, t, n);
      };
      let $s = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t)
              ? zs(t, e, "")
              : zs(t.providers, t.parent, t.name || "");
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = Ut),
          (t.NULL = new Gt()),
          (t.ɵprov = it({
            token: t,
            providedIn: "any",
            factory: () => Vt(Nt),
          })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      const Vs = new jt("AnalyzeForEntryComponents");
      function qs(t, e, n) {
        let r = n ? t.styles : null,
          s = n ? t.classes : null,
          o = 0;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const t = e[i];
            "number" == typeof t
              ? (o = t)
              : 1 == o
              ? (s = yt(s, t))
              : 2 == o && (r = yt(r, t + ": " + e[++i] + ";"));
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r),
          n ? (t.classes = s) : (t.classesWithoutHost = s);
      }
      let Bs = null;
      function Gs() {
        if (!Bs) {
          const t = Et.Symbol;
          if (t && t.iterator) Bs = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (Bs = n);
            }
          }
        }
        return Bs;
      }
      function Ws(t) {
        return (
          !!Zs(t) && (Array.isArray(t) || (!(t instanceof Map) && Gs() in t))
        );
      }
      function Zs(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function Qs(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function Ks(t, e, n, r) {
        const s = Fe();
        return (
          Qs(s, We(), e) &&
            (ze(),
            (function (t, e, n, r, s, o) {
              const i = Ie(t, e),
                a = e[11];
              if (null == r)
                ke(a) ? a.removeAttribute(i, n, o) : i.removeAttribute(n);
              else {
                const e = null == s ? Cn(r) : s(r, t.tagName || "", n);
                ke(a)
                  ? a.setAttribute(i, n, e, o)
                  : o
                  ? i.setAttributeNS(o, n, e)
                  : i.setAttribute(n, e);
              }
            })(an(), s, t, e, n, r)),
          Ks
        );
      }
      function Js(t, e = st.Default) {
        const n = Fe();
        return null == n ? Vt(t, e) : Dn($e(), n, _t(t), e);
      }
      function Ys(t, e, n, r, s) {
        const o = s ? "class" : "style";
        ts(t, n, e.inputs[o], o, r);
      }
      function Xs(t, e, n, r) {
        const s = Fe(),
          o = ze(),
          i = 20 + t,
          a = s[11],
          l = (s[i] = xr(e, a, Me.lFrame.currentNamespace)),
          c = o.firstCreatePass
            ? (function (t, e, n, r, s, o, i) {
                const a = e.consts,
                  l = Ue(a, o),
                  c = Cr(e, n[6], t, 3, s, l);
                return (
                  (function (t, e, n, r) {
                    let s = !1;
                    if (Le()) {
                      const o = (function (t, e, n) {
                          const r = t.directiveRegistry;
                          let s = null;
                          if (r)
                            for (let o = 0; o < r.length; o++) {
                              const i = r[o];
                              hr(n, i.selectors, !1) &&
                                (s || (s = []),
                                Un(On(n, e), t, i.type),
                                ve(i)
                                  ? (2 & n.flags && nr(n),
                                    Hr(t, n),
                                    s.unshift(i))
                                  : s.push(i));
                            }
                          return s;
                        })(t, e, n),
                        i = null === r ? null : { "": -1 };
                      if (null !== o) {
                        let r = 0;
                        (s = !0), Lr(n, t.data.length, o.length);
                        for (let t = 0; t < o.length; t++) {
                          const e = o[t];
                          e.providersResolver && e.providersResolver(e);
                        }
                        Dr(t, n, o.length);
                        let a = !1,
                          l = !1;
                        for (let s = 0; s < o.length; s++) {
                          const c = o[s];
                          (n.mergedAttrs = vn(n.mergedAttrs, c.hostAttrs)),
                            Fr(t, e, c),
                            Mr(t.data.length - 1, c, i),
                            null !== c.contentQueries && (n.flags |= 8),
                            (null === c.hostBindings &&
                              null === c.hostAttrs &&
                              0 === c.hostVars) ||
                              (n.flags |= 128);
                          const u = c.type.prototype;
                          !a &&
                            (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
                            ((t.preOrderHooks || (t.preOrderHooks = [])).push(
                              n.index - 20
                            ),
                            (a = !0)),
                            l ||
                              (!u.ngOnChanges && !u.ngDoCheck) ||
                              ((
                                t.preOrderCheckHooks ||
                                (t.preOrderCheckHooks = [])
                              ).push(n.index - 20),
                              (l = !0)),
                            jr(t, c),
                            (r += c.hostVars);
                        }
                        !(function (t, e) {
                          const n = e.directiveEnd,
                            r = t.data,
                            s = e.attrs,
                            o = [];
                          let i = null,
                            a = null;
                          for (let l = e.directiveStart; l < n; l++) {
                            const t = r[l],
                              n = t.inputs,
                              c = null === s || ir(e) ? null : Vr(n, s);
                            o.push(c),
                              (i = Pr(n, l, i)),
                              (a = Pr(t.outputs, l, a));
                          }
                          null !== i &&
                            (i.hasOwnProperty("class") && (e.flags |= 16),
                            i.hasOwnProperty("style") && (e.flags |= 32)),
                            (e.initialInputs = o),
                            (e.inputs = i),
                            (e.outputs = a);
                        })(t, n),
                          Nr(t, e, r);
                      }
                      i &&
                        (function (t, e, n) {
                          if (e) {
                            const r = (t.localNames = []);
                            for (let t = 0; t < e.length; t += 2) {
                              const s = n[e[t + 1]];
                              if (null == s)
                                throw new Error(
                                  `Export of name '${e[t + 1]}' not found!`
                                );
                              r.push(e[t], s);
                            }
                          }
                        })(n, r, i);
                    }
                    n.mergedAttrs = vn(n.mergedAttrs, n.attrs);
                  })(e, n, c, Ue(a, i)),
                  null !== c.attrs && qs(c, c.attrs, !1),
                  null !== c.mergedAttrs && qs(c, c.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, c),
                  c
                );
              })(t, o, s, 0, e, n, r)
            : o.data[i];
        Ve(c, !0);
        const u = c.mergedAttrs;
        null !== u && gn(a, l, u);
        const h = c.classes;
        null !== h && _s(a, l, h);
        const d = c.styles;
        null !== d && ws(a, l, d),
          fs(o, s, l, c),
          0 === Me.lFrame.elementDepthCount && er(l, s),
          Me.lFrame.elementDepthCount++,
          ye(c) &&
            ((function (t, e, n) {
              Le() &&
                ((function (t, e, n, r) {
                  const s = n.directiveStart,
                    o = n.directiveEnd;
                  t.firstCreatePass || On(n, e), er(r, e);
                  const i = n.initialInputs;
                  for (let a = s; a < o; a++) {
                    const r = t.data[a],
                      o = ve(r);
                    o && zr(e, n, r);
                    const l = Ln(e, t, a, n);
                    er(l, e),
                      null !== i && $r(0, a - s, l, r, 0, i),
                      o && (Pe(n.index, e)[8] = l);
                  }
                })(t, e, n, Ie(n, e)),
                128 == (128 & n.flags) &&
                  (function (t, e, n) {
                    const r = n.directiveStart,
                      s = n.directiveEnd,
                      o = t.expandoInstructions,
                      i = t.firstCreatePass,
                      a = n.index - 20,
                      l = Me.lFrame.currentDirectiveIndex;
                    try {
                      on(a);
                      for (let n = r; n < s; n++) {
                        const r = t.data[n],
                          s = e[n];
                        Qe(n),
                          null !== r.hostBindings ||
                          0 !== r.hostVars ||
                          null !== r.hostAttrs
                            ? Ur(r, s)
                            : i && o.push(null);
                      }
                    } finally {
                      on(-1), Qe(l);
                    }
                  })(t, e, n));
            })(o, s, c),
            (function (t, e, n) {
              if (ge(e)) {
                const r = e.directiveEnd;
                for (let s = e.directiveStart; s < r; s++) {
                  const e = t.data[s];
                  e.contentQueries && e.contentQueries(1, n[s], s);
                }
              }
            })(o, c, s)),
          null !== r &&
            (function (t, e, n = Ie) {
              const r = e.localNames;
              if (null !== r) {
                let s = e.index + 1;
                for (let o = 0; o < r.length; o += 2) {
                  const i = r[o + 1],
                    a = -1 === i ? n(e, t) : t[i];
                  t[s++] = a;
                }
              }
            })(s, c);
      }
      function to() {
        let t = $e();
        qe() ? (Me.lFrame.isParent = !1) : ((t = t.parent), Ve(t, !1));
        const e = t;
        Me.lFrame.elementDepthCount--;
        const n = ze();
        n.firstCreatePass && (ln(n, t), ge(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            Ys(n, e, Fe(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            Ys(n, e, Fe(), e.stylesWithoutHost, !1);
      }
      function eo(t, e, n, r) {
        Xs(t, e, n, r), to();
      }
      function no(t) {
        return !!t && "function" == typeof t.then;
      }
      function ro(t, e, n = !1, r) {
        const s = Fe(),
          o = ze(),
          i = $e();
        return (
          (function (t, e, n, r, s, o, i = !1, a) {
            const l = ye(r),
              c = t.firstCreatePass && (t.cleanup || (t.cleanup = [])),
              u = Yr(e);
            let h = !0;
            if (3 === r.type) {
              const d = Ie(r, e),
                p = a ? a(d) : te,
                f = p.target || d,
                g = u.length,
                m = a ? (t) => a(Re(t[r.index])).target : r.index;
              if (ke(n)) {
                let i = null;
                if (
                  (!a &&
                    l &&
                    (i = (function (t, e, n, r) {
                      const s = t.cleanup;
                      if (null != s)
                        for (let o = 0; o < s.length - 1; o += 2) {
                          const t = s[o];
                          if (t === n && s[o + 1] === r) {
                            const t = e[7],
                              n = s[o + 2];
                            return t.length > n ? t[n] : null;
                          }
                          "string" == typeof t && (o += 2);
                        }
                      return null;
                    })(t, e, s, r.index)),
                  null !== i)
                )
                  ((i.__ngLastListenerFn__ || i).__ngNextListenerFn__ = o),
                    (i.__ngLastListenerFn__ = o),
                    (h = !1);
                else {
                  o = oo(r, e, o, !1);
                  const t = n.listen(p.name || f, s, o);
                  u.push(o, t), c && c.push(s, m, g, g + 1);
                }
              } else
                (o = oo(r, e, o, !0)),
                  f.addEventListener(s, o, i),
                  u.push(o),
                  c && c.push(s, m, g, i);
            }
            const d = r.outputs;
            let p;
            if (h && null !== d && (p = d[s])) {
              const t = p.length;
              if (t)
                for (let n = 0; n < t; n += 2) {
                  const t = e[p[n]][p[n + 1]].subscribe(o),
                    i = u.length;
                  u.push(o, t), c && c.push(s, r.index, i, -(i + 1));
                }
            }
          })(o, s, s[11], i, t, e, n, r),
          ro
        );
      }
      function so(t, e, n) {
        try {
          return !1 !== e(n);
        } catch (r) {
          return Xr(t, r), !1;
        }
      }
      function oo(t, e, n, r) {
        return function s(o) {
          if (o === Function) return n;
          const i = 2 & t.flags ? Pe(t.index, e) : e;
          0 == (32 & e[2]) && Wr(i);
          let a = so(e, n, o),
            l = s.__ngNextListenerFn__;
          for (; l; ) (a = so(e, l, o) && a), (l = l.__ngNextListenerFn__);
          return r && !1 === a && (o.preventDefault(), (o.returnValue = !1)), a;
        };
      }
      function io(t, e = "") {
        const n = Fe(),
          r = ze(),
          s = t + 20,
          o = r.firstCreatePass ? Cr(r, n[6], t, 3, null, null) : r.data[s],
          i = (n[s] = (function (t, e) {
            return ke(e) ? e.createText(t) : e.createTextNode(t);
          })(e, n[11]));
        fs(r, n, i, o), Ve(o, !1);
      }
      function ao(t, e, n) {
        const r = Fe(),
          s = (function (t, e, n, r) {
            return Qs(t, We(), n) ? e + Cn(n) + r : fr;
          })(r, t, e, n);
        return (
          s !== fr &&
            (function (t, e, n) {
              const r = (function (t, e) {
                  return Re(e[t + 20]);
                })(e, t),
                s = t[11];
              ke(s) ? s.setValue(r, n) : (r.textContent = n);
            })(r, sn(), s),
          ao
        );
      }
      function lo(t, e, n) {
        const r = Fe();
        return (
          Qs(r, We(), e) &&
            (function (t, e, n, r, s, o, i, a) {
              const l = Ie(e, n);
              var c;
              3 === e.type &&
                ((r =
                  "class" === (c = r)
                    ? "className"
                    : "for" === c
                    ? "htmlFor"
                    : "formaction" === c
                    ? "formAction"
                    : "innerHtml" === c
                    ? "innerHTML"
                    : "readonly" === c
                    ? "readOnly"
                    : "tabindex" === c
                    ? "tabIndex"
                    : c),
                (s = null != i ? i(s, e.tagName || "", r) : s),
                ke(o)
                  ? o.setProperty(l, r, s)
                  : yn(r) ||
                    (l.setProperty ? l.setProperty(r, s) : (l[r] = s)));
            })(ze(), an(), r, t, e, r[11], n),
          lo
        );
      }
      function co(t, e) {
        const n = je(t)[1],
          r = n.data.length - 1;
        ln(n, { directiveStart: r, directiveEnd: r + 1 });
      }
      class uo {}
      class ho {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${mt(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      let po = (() => {
          class t {}
          return (t.NULL = new ho()), t;
        })(),
        fo = (() => {
          class t {
            constructor(t) {
              this.nativeElement = t;
            }
          }
          return (t.__NG_ELEMENT_ID__ = () => go(t)), t;
        })();
      const go = function (t) {
        return Es(t, $e(), Fe());
      };
      class mo {}
      var yo = (function (t) {
        return (
          (t[(t.Important = 1)] = "Important"),
          (t[(t.DashCase = 2)] = "DashCase"),
          t
        );
      })({});
      let vo = (() => {
        class t {}
        return (
          (t.ɵprov = it({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class wo {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const _o = new wo("10.0.14");
      class bo {
        constructor() {}
        supports(t) {
          return Ws(t);
        }
        create(t) {
          return new So(t);
        }
      }
      const xo = (t, e) => e;
      class So {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || xo);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            r = 0,
            s = null;
          for (; e || n; ) {
            const o = !n || (e && e.currentIndex < ko(n, r, s)) ? e : n,
              i = ko(o, r, s),
              a = o.currentIndex;
            if (o === n) r--, (n = n._nextRemoved);
            else if (((e = e._next), null == o.previousIndex)) r++;
            else {
              s || (s = []);
              const t = i - r,
                e = a - r;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const r = n < s.length ? s[n] : (s[n] = 0),
                    o = r + n;
                  e <= o && o < t && (s[n] = r + 1);
                }
                s[o.previousIndex] = e - t;
              }
            }
            i !== a && t(o, i, a);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !Ws(t)))
            throw new Error(
              `Error trying to diff '${mt(
                t
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            r,
            s = this._itHead,
            o = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (r = this._trackByFn(e, n)),
                null !== s && Object.is(s.trackById, r)
                  ? (o && (s = this._verifyReinsertion(s, n, r, e)),
                    Object.is(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, r, e)), (o = !0)),
                (s = s._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[Gs()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(t, (t) => {
                (r = this._trackByFn(e, t)),
                  null !== s && Object.is(s.trackById, r)
                    ? (o && (s = this._verifyReinsertion(s, t, r, e)),
                      Object.is(s.item, t) || this._addIdentityChange(s, t))
                    : ((s = this._mismatch(s, t, r, e)), (o = !0)),
                  (s = s._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(s), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t, e;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = e
            )
              (t.previousIndex = t.currentIndex), (e = t._nextMoved);
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, r) {
          let s;
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, r))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, s, r))
              : null !==
                (t =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, s, r))
              : (t = this._addAfter(new Co(e, n), s, r)),
            t
          );
        }
        _verifyReinsertion(t, e, n, r) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, r))
              : t.currentIndex != r &&
                ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            s = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new To()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new To()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class Co {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class Eo {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if (
              (null === e || e <= n.currentIndex) &&
              Object.is(n.trackById, t)
            )
              return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class To {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new Eo()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function ko(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let s = 0;
        return n && r < n.length && (s = n[r]), r + e + s;
      }
      class Ao {
        constructor() {}
        supports(t) {
          return t instanceof Map || Zs(t);
        }
        create() {
          return new Ro();
        }
      }
      class Ro {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Zs(t)))
              throw new Error(
                `Error trying to diff '${mt(
                  t
                )}'. Only maps and objects are allowed`
              );
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const r = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, r);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const r = n._prev,
              s = n._next;
            return (
              r && (r._next = s),
              s && (s._prev = r),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new Io(t);
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class Io {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      let Oo = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (null != n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new rt(), new et()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (null != e) return e;
              throw new Error(
                `Cannot find a differ supporting object '${t}' of type '${
                  ((n = t), n.name || typeof n)
                }'`
              );
              var n;
            }
          }
          return (
            (t.ɵprov = it({
              token: t,
              providedIn: "root",
              factory: () => new t([new bo()]),
            })),
            t
          );
        })(),
        Po = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new rt(), new et()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (e) return e;
              throw new Error(`Cannot find a differ supporting object '${t}'`);
            }
          }
          return (
            (t.ɵprov = it({
              token: t,
              providedIn: "root",
              factory: () => new t([new Ao()]),
            })),
            t
          );
        })();
      const jo = [new Ao()],
        No = new Oo([new bo()]),
        Uo = new Po(jo);
      let Do = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Ho(t, fo)), t;
      })();
      const Ho = function (t, e) {
          return (function (t, e, n, r) {
            let s;
            Cs ||
              (Cs = class extends t {
                constructor(t, e, n) {
                  super(),
                    (this._lContainer = t),
                    (this._hostTNode = e),
                    (this._hostView = n);
                }
                get element() {
                  return Es(e, this._hostTNode, this._hostView);
                }
                get injector() {
                  return new $n(this._hostTNode, this._hostView);
                }
                get parentInjector() {
                  const t = Nn(this._hostTNode, this._hostView),
                    e = Sn(t, this._hostView),
                    n = (function (t, e, n) {
                      if (n.parent && -1 !== n.parent.injectorIndex) {
                        const t = n.parent.injectorIndex;
                        let e = n.parent;
                        for (
                          ;
                          null != e.parent && t == e.parent.injectorIndex;

                        )
                          e = e.parent;
                        return e;
                      }
                      let r = xn(t),
                        s = e,
                        o = e[6];
                      for (; r > 1; ) (s = s[15]), (o = s[6]), r--;
                      return o;
                    })(t, this._hostView, this._hostTNode);
                  return _n(t) && null != n
                    ? new $n(n, e)
                    : new $n(null, this._hostView);
                }
                clear() {
                  for (; this.length > 0; ) this.remove(this.length - 1);
                }
                get(t) {
                  return (
                    (null !== this._lContainer[8] && this._lContainer[8][t]) ||
                    null
                  );
                }
                get length() {
                  return this._lContainer.length - 10;
                }
                createEmbeddedView(t, e, n) {
                  const r = t.createEmbeddedView(e || {});
                  return this.insert(r, n), r;
                }
                createComponent(t, e, n, r, s) {
                  const o = n || this.parentInjector;
                  if (!s && null == t.ngModule && o) {
                    const t = o.get(Wt, null);
                    t && (s = t);
                  }
                  const i = t.create(o, r, void 0, s);
                  return this.insert(i.hostView, e), i;
                }
                insert(t, e) {
                  const n = t._lView,
                    r = n[1];
                  if (t.destroyed)
                    throw new Error(
                      "Cannot insert a destroyed View in a ViewContainer!"
                    );
                  if ((this.allocateContainerIfNeeded(), fe(n[3]))) {
                    const e = this.indexOf(t);
                    if (-1 !== e) this.detach(e);
                    else {
                      const e = n[3],
                        r = new Cs(e, e[6], e[3]);
                      r.detach(r.indexOf(t));
                    }
                  }
                  const s = this._adjustIndex(e);
                  return (
                    (function (t, e, n, r) {
                      const s = 10 + r,
                        o = n.length;
                      r > 0 && (n[s - 1][4] = e),
                        r < o - 10
                          ? ((e[4] = n[s]), Kt(n, 10 + r, e))
                          : (n.push(e), (e[4] = null)),
                        (e[3] = n);
                      const i = e[17];
                      null !== i &&
                        n !== i &&
                        (function (t, e) {
                          const n = t[9];
                          e[16] !== e[3][3][16] && (t[2] = !0),
                            null === n ? (t[9] = [e]) : n.push(e);
                        })(i, e);
                      const a = e[19];
                      null !== a && a.insertView(t), (e[2] |= 128);
                    })(r, n, this._lContainer, s),
                    ss(r, n, !0, gs(s, this._lContainer)),
                    t.attachToViewContainerRef(this),
                    Kt(this._lContainer[8], s, t),
                    t
                  );
                }
                move(t, e) {
                  if (t.destroyed)
                    throw new Error(
                      "Cannot move a destroyed View in a ViewContainer!"
                    );
                  return this.insert(t, e);
                }
                indexOf(t) {
                  const e = this._lContainer[8];
                  return null !== e ? e.indexOf(t) : -1;
                }
                remove(t) {
                  this.allocateContainerIfNeeded();
                  const e = this._adjustIndex(t, -1),
                    n = is(this._lContainer, e);
                  n && (Jt(this._lContainer[8], e), as(n[1], n));
                }
                detach(t) {
                  this.allocateContainerIfNeeded();
                  const e = this._adjustIndex(t, -1),
                    n = is(this._lContainer, e);
                  return n && null != Jt(this._lContainer[8], e)
                    ? new bs(n)
                    : null;
                }
                _adjustIndex(t, e = 0) {
                  return null == t ? this.length + e : t;
                }
                allocateContainerIfNeeded() {
                  null === this._lContainer[8] && (this._lContainer[8] = []);
                }
              });
            const o = r[n.index];
            if (fe(o)) s = o;
            else {
              let t;
              if (4 === n.type) t = Re(o);
              else if (((t = r[11].createComment("")), we(r))) {
                const e = r[11],
                  s = Ie(n, r);
                us(
                  e,
                  ps(e, s),
                  t,
                  (function (t, e) {
                    return ke(t) ? t.nextSibling(e) : e.nextSibling;
                  })(e, s)
                );
              } else fs(r[1], r, t, n);
              (r[n.index] = s = new Array(
                o,
                !0,
                !1,
                r,
                null,
                0,
                n,
                t,
                null,
                null
              )),
                Gr(r, s);
            }
            return new Cs(s, n, r);
          })(t, e, $e(), Fe());
        },
        Mo = {};
      class Lo extends po {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = ue(t);
          return new $o(e, this.ngModule);
        }
      }
      function Fo(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const zo = new jt("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Tn,
      });
      class $o extends uo {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(pr).join(",")),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return Fo(this.componentDef.inputs);
        }
        get outputs() {
          return Fo(this.componentDef.outputs);
        }
        create(t, e, n, r) {
          const s = (r = r || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, r, s) => {
                      const o = t.get(n, Mo, s);
                      return o !== Mo || r === Mo ? o : e.get(n, r, s);
                    },
                  };
                })(t, r.injector)
              : t,
            o = s.get(mo, Ae),
            i = s.get(vo, null),
            a = o.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = n
              ? (function (t, e, n) {
                  if (ke(t)) return t.selectRootElement(e, n === Xt.ShadowDom);
                  let r = "string" == typeof e ? t.querySelector(e) : e;
                  return (r.textContent = ""), r;
                })(a, n, this.componentDef.encapsulation)
              : xr(
                  l,
                  o.createRenderer(null, this.componentDef),
                  (function (t) {
                    const e = t.toLowerCase();
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(l)
                ),
            u = this.componentDef.onPush ? 576 : 528,
            h = {
              components: [],
              scheduler: Tn,
              clean: Jr,
              playerHandler: null,
              flags: 0,
            },
            d = Ir(0, -1, null, 1, 0, null, null, null, null, null),
            p = Sr(null, d, h, u, null, null, o, a, i, s);
          let f, g;
          Ye(p, null);
          try {
            const t = (function (t, e, n, r, s, o) {
              const i = n[1];
              n[20] = t;
              const a = Cr(i, null, 0, 3, null, null),
                l = (a.mergedAttrs = e.hostAttrs);
              null !== l &&
                (qs(a, l, !0),
                null !== t &&
                  (gn(s, t, l),
                  null !== a.classes && _s(s, t, a.classes),
                  null !== a.styles && ws(s, t, a.styles)));
              const c = r.createRenderer(t, e),
                u = Sr(
                  n,
                  Rr(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  a,
                  r,
                  c,
                  void 0
                );
              return (
                i.firstCreatePass &&
                  (Un(On(a, n), i, e.type), Hr(i, a), Lr(a, n.length, 1)),
                Gr(n, u),
                (n[20] = u)
              );
            })(c, this.componentDef, p, o, a);
            if (c)
              if (n) gn(a, c, ["ng-version", _o.full]);
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    s = 2;
                  for (; r < t.length; ) {
                    let o = t[r];
                    if ("string" == typeof o)
                      2 === s
                        ? "" !== o && e.push(o, t[++r])
                        : 8 === s && n.push(o);
                    else {
                      if (!cr(s)) break;
                      s = o;
                    }
                    r++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && gn(a, c, t), e && e.length > 0 && _s(a, c, e.join(" "));
              }
            if (((g = Oe(d, 0)), void 0 !== e)) {
              const t = (g.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const r = e[n];
                t.push(null != r ? Array.from(r) : null);
              }
            }
            (f = (function (t, e, n, r, s) {
              const o = n[1],
                i = (function (t, e, n) {
                  const r = $e();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Dr(t, r, 1),
                    Fr(t, e, n));
                  const s = Ln(e, t, e.length - 1, r);
                  er(s, e);
                  const o = Ie(r, e);
                  return o && er(o, e), s;
                })(o, n, e);
              r.components.push(i),
                (t[8] = i),
                s && s.forEach((t) => t(i, e)),
                e.contentQueries && e.contentQueries(1, i, n.length - 1);
              const a = $e();
              if (
                o.firstCreatePass &&
                (null !== e.hostBindings || null !== e.hostAttrs)
              ) {
                on(a.index - 20);
                const t = n[1];
                jr(t, e), Nr(t, n, e.hostVars), Ur(e, i);
              }
              return i;
            })(t, this.componentDef, p, h, [co])),
              Er(d, p, null);
          } finally {
            rn();
          }
          const m = new Vo(this.componentType, f, Es(fo, g, p), p, g);
          return (d.node.child = g), m;
        }
      }
      class Vo extends class {} {
        constructor(t, e, n, r, s) {
          super(),
            (this.location = n),
            (this._rootLView = r),
            (this._tNode = s),
            (this.destroyCbs = []),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new xs(r)),
            (function (t, e, n, r) {
              let s = t.node;
              null == s && (t.node = s = Or(0, null, 2, -1, null, null)),
                (r[6] = s);
            })(r[1], 0, 0, r),
            (this.componentType = t);
        }
        get injector() {
          return new $n(this._tNode, this._rootLView);
        }
        destroy() {
          this.destroyCbs &&
            (this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null),
            !this.hostView.destroyed && this.hostView.destroy());
        }
        onDestroy(t) {
          this.destroyCbs && this.destroyCbs.push(t);
        }
      }
      const qo = void 0;
      var Bo = [
        "en",
        [["a", "p"], ["AM", "PM"], qo],
        [["AM", "PM"], qo, qo],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        qo,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        qo,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", qo, "{1} 'at' {0}", qo],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let Go = {};
      function Wo(t) {
        return (
          t in Go ||
            (Go[t] =
              Et.ng &&
              Et.ng.common &&
              Et.ng.common.locales &&
              Et.ng.common.locales[t]),
          Go[t]
        );
      }
      var Zo = (function (t) {
        return (
          (t[(t.LocaleId = 0)] = "LocaleId"),
          (t[(t.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
          (t[(t.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
          (t[(t.DaysFormat = 3)] = "DaysFormat"),
          (t[(t.DaysStandalone = 4)] = "DaysStandalone"),
          (t[(t.MonthsFormat = 5)] = "MonthsFormat"),
          (t[(t.MonthsStandalone = 6)] = "MonthsStandalone"),
          (t[(t.Eras = 7)] = "Eras"),
          (t[(t.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
          (t[(t.WeekendRange = 9)] = "WeekendRange"),
          (t[(t.DateFormat = 10)] = "DateFormat"),
          (t[(t.TimeFormat = 11)] = "TimeFormat"),
          (t[(t.DateTimeFormat = 12)] = "DateTimeFormat"),
          (t[(t.NumberSymbols = 13)] = "NumberSymbols"),
          (t[(t.NumberFormats = 14)] = "NumberFormats"),
          (t[(t.CurrencyCode = 15)] = "CurrencyCode"),
          (t[(t.CurrencySymbol = 16)] = "CurrencySymbol"),
          (t[(t.CurrencyName = 17)] = "CurrencyName"),
          (t[(t.Currencies = 18)] = "Currencies"),
          (t[(t.Directionality = 19)] = "Directionality"),
          (t[(t.PluralCase = 20)] = "PluralCase"),
          (t[(t.ExtraData = 21)] = "ExtraData"),
          t
        );
      })({});
      let Qo = "en-US";
      function Ko(t) {
        var e, n;
        (n = "Expected localeId to be defined"),
          null == (e = t) &&
            (function (t, e, n, r) {
              throw new Error(
                "ASSERTION ERROR: " + t + ` [Expected=> null != ${e} <=Actual]`
              );
            })(n, e),
          "string" == typeof t && (Qo = t.toLowerCase().replace(/_/g, "-"));
      }
      const Jo = new Map();
      class Yo extends Wt {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Lo(this));
          const n = de(t),
            r = t[It] || null;
          r && Ko(r),
            (this._bootstrapComponents = kn(n.bootstrap)),
            (this._r3Injector = Us(
              t,
              e,
              [
                { provide: Wt, useValue: this },
                { provide: po, useValue: this.componentFactoryResolver },
              ],
              mt(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = $s.THROW_IF_NOT_FOUND, n = st.Default) {
          return t === $s || t === Wt || t === Nt
            ? this
            : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Xo extends Zt {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== de(t) &&
              (function t(e) {
                if (null !== e.ɵmod.id) {
                  const t = e.ɵmod.id;
                  (function (t, e, n) {
                    if (e && e !== n)
                      throw new Error(
                        `Duplicate module registered for ${t} - ${mt(
                          e
                        )} vs ${mt(e.name)}`
                      );
                  })(t, Jo.get(t), e),
                    Jo.set(t, e);
                }
                let n = e.ɵmod.imports;
                n instanceof Function && (n = n()), n && n.forEach((e) => t(e));
              })(t);
        }
        create(t) {
          return new Yo(this.moduleType, t);
        }
      }
      const ti = class extends S {
          constructor(t = !1) {
            super(), (this.__isAsync = t);
          }
          emit(t) {
            super.next(t);
          }
          subscribe(t, e, n) {
            let r,
              s = (t) => null,
              o = () => null;
            t && "object" == typeof t
              ? ((r = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t.next(e));
                    }
                  : (e) => {
                      t.next(e);
                    }),
                t.error &&
                  (s = this.__isAsync
                    ? (e) => {
                        setTimeout(() => t.error(e));
                      }
                    : (e) => {
                        t.error(e);
                      }),
                t.complete &&
                  (o = this.__isAsync
                    ? () => {
                        setTimeout(() => t.complete());
                      }
                    : () => {
                        t.complete();
                      }))
              : ((r = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t(e));
                    }
                  : (e) => {
                      t(e);
                    }),
                e &&
                  (s = this.__isAsync
                    ? (t) => {
                        setTimeout(() => e(t));
                      }
                    : (t) => {
                        e(t);
                      }),
                n &&
                  (o = this.__isAsync
                    ? () => {
                        setTimeout(() => n());
                      }
                    : () => {
                        n();
                      }));
            const i = super.subscribe(r, s, o);
            return t instanceof h && t.add(i), i;
          }
        },
        ei = new jt("Application Initializer");
      let ni = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                no(e) && t.push(e);
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Vt(ei, 8));
          }),
          (t.ɵprov = it({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ri = new jt("AppId"),
        si = {
          provide: ri,
          useFactory: function () {
            return `${oi()}${oi()}${oi()}`;
          },
          deps: [],
        };
      function oi() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const ii = new jt("Platform Initializer"),
        ai = new jt("Platform ID"),
        li = new jt("appBootstrapListener");
      let ci = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = it({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ui = new jt("LocaleId"),
        hi = new jt("DefaultCurrencyCode");
      class di {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const pi = function (t) {
          return new Xo(t);
        },
        fi = pi,
        gi = function (t) {
          return Promise.resolve(pi(t));
        },
        mi = function (t) {
          const e = pi(t),
            n = kn(de(t).declarations).reduce((t, e) => {
              const n = ue(e);
              return n && t.push(new $o(n)), t;
            }, []);
          return new di(e, n);
        },
        yi = mi,
        vi = function (t) {
          return Promise.resolve(mi(t));
        };
      let wi = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = fi),
              (this.compileModuleAsync = gi),
              (this.compileModuleAndAllComponentsSync = yi),
              (this.compileModuleAndAllComponentsAsync = vi);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = it({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const _i = (() => Promise.resolve(0))();
      function bi(t) {
        "undefined" == typeof Zone
          ? _i.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class xi {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ti(!1)),
            (this.onMicrotaskEmpty = new ti(!1)),
            (this.onStable = new ti(!1)),
            (this.onError = new ti(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.wtfZoneSpec &&
              (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            (this.shouldCoalesceEventChangeDetection = e),
            (this.lastRequestAnimationFrameId = -1),
            (this.nativeRequestAnimationFrame = (function () {
              let t = Et.requestAnimationFrame,
                e = Et.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e =
                !!t.shouldCoalesceEventChangeDetection &&
                t.nativeRequestAnimationFrame &&
                (() => {
                  !(function (t) {
                    -1 === t.lastRequestAnimationFrameId &&
                      ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
                        Et,
                        () => {
                          t.fakeTopEventTask ||
                            (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                              "fakeTopEventTask",
                              () => {
                                (t.lastRequestAnimationFrameId = -1),
                                  Ti(t),
                                  Ei(t);
                              },
                              void 0,
                              () => {},
                              () => {}
                            )),
                            t.fakeTopEventTask.invoke();
                        }
                      )),
                      Ti(t));
                  })(t);
                });
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0, maybeDelayChangeDetection: e },
                onInvokeTask: (n, r, s, o, i, a) => {
                  try {
                    return ki(t), n.invokeTask(s, o, i, a);
                  } finally {
                    e && "eventTask" === o.type && e(), Ai(t);
                  }
                },
                onInvoke: (e, n, r, s, o, i, a) => {
                  try {
                    return ki(t), e.invoke(r, s, o, i, a);
                  } finally {
                    Ai(t);
                  }
                },
                onHasTask: (e, n, r, s) => {
                  e.hasTask(r, s),
                    n === r &&
                      ("microTask" == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask),
                          Ti(t),
                          Ei(t))
                        : "macroTask" == s.change &&
                          (t.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (e, n, r, s) => (
                  e.handleError(r, s),
                  t.runOutsideAngular(() => t.onError.emit(s)),
                  !1
                ),
              });
            })(this);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!xi.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (xi.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, r) {
          const s = this._inner,
            o = s.scheduleEventTask("NgZoneEvent: " + r, t, Ci, Si, Si);
          try {
            return s.runTask(o, e, n);
          } finally {
            s.cancelTask(o);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      function Si() {}
      const Ci = {};
      function Ei(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function Ti(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          (t.shouldCoalesceEventChangeDetection &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function ki(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Ai(t) {
        t._nesting--, Ei(t);
      }
      class Ri {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ti()),
            (this.onMicrotaskEmpty = new ti()),
            (this.onStable = new ti()),
            (this.onError = new ti());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, r) {
          return t.apply(e, n);
        }
      }
      let Ii = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      xi.assertNotInAngularZone(),
                        bi(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                bi(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) =>
                    !e.updateCb ||
                    !e.updateCb(t) ||
                    (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let r = -1;
              e &&
                e > 0 &&
                (r = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (t) => t.timeoutId !== r
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: r, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Vt(xi));
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Oi = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), Ni.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return Ni.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class Pi {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let ji,
        Ni = new Pi();
      const Ui = new jt("AllowMultipleToken");
      class Di {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function Hi(t, e, n = []) {
        const r = "Platform: " + e,
          s = new jt(r);
        return (e = []) => {
          let o = Mi();
          if (!o || o.injector.get(Ui, !1))
            if (t) t(n.concat(e).concat({ provide: s, useValue: !0 }));
            else {
              const t = n
                .concat(e)
                .concat(
                  { provide: s, useValue: !0 },
                  { provide: Rs, useValue: "platform" }
                );
              !(function (t) {
                if (ji && !ji.destroyed && !ji.injector.get(Ui, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                ji = t.get(Li);
                const e = t.get(ii, null);
                e && e.forEach((t) => t());
              })($s.create({ providers: t, name: r }));
            }
          return (function (t) {
            const e = Mi();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(s);
        };
      }
      function Mi() {
        return ji && !ji.destroyed ? ji : null;
      }
      let Li = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new Ri()
                      : ("zone.js" === t ? void 0 : t) ||
                        new xi({
                          enableLongStackTrace: Kn(),
                          shouldCoalesceEventChangeDetection: e,
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, (e && e.ngZoneEventCoalescing) || !1),
              r = [{ provide: xi, useValue: n }];
            return n.run(() => {
              const e = $s.create({
                  providers: r,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                s = t.create(e),
                o = s.injector.get(Gn, null);
              if (!o)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                s.onDestroy(() => $i(this._modules, s)),
                n.runOutsideAngular(() =>
                  n.onError.subscribe({
                    next: (t) => {
                      o.handleError(t);
                    },
                  })
                ),
                (function (t, e, n) {
                  try {
                    const r = n();
                    return no(r)
                      ? r.catch((n) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(n)), n)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(o, n, () => {
                  const t = s.injector.get(ni);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        Ko(s.injector.get(ui, "en-US") || "en-US"),
                        this._moduleDoBootstrap(s),
                        s
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = Fi({}, e);
            return (function (t, e, n) {
              const r = new Xo(n);
              return Promise.resolve(r);
            })(0, 0, t).then((t) => this.bootstrapModuleFactory(t, n));
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(zi);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${mt(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Vt($s));
          }),
          (t.ɵprov = it({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Fi(t, e) {
        return Array.isArray(e)
          ? e.reduce(Fi, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let zi = (() => {
        class t {
          constructor(t, e, n, r, s, o) {
            (this._zone = t),
              (this._console = e),
              (this._injector = n),
              (this._exceptionHandler = r),
              (this._componentFactoryResolver = s),
              (this._initStatus = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._enforceNoNewChanges = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._enforceNoNewChanges = Kn()),
              this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              });
            const i = new v((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              a = new v((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    xi.assertNotInAngularZone(),
                      bi(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  xi.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (function (...t) {
              let e = Number.POSITIVE_INFINITY,
                n = null,
                r = t[t.length - 1];
              return (
                E(r)
                  ? ((n = t.pop()),
                    t.length > 1 &&
                      "number" == typeof t[t.length - 1] &&
                      (e = t.pop()))
                  : "number" == typeof r && (e = t.pop()),
                null === n && 1 === t.length && t[0] instanceof v
                  ? t[0]
                  : V(e)(q(t, n))
              );
            })(
              i,
              a.pipe((t) => {
                return B()(
                  ((e = J),
                  function (t) {
                    let n;
                    n =
                      "function" == typeof e
                        ? e
                        : function () {
                            return e;
                          };
                    const r = Object.create(t, Q);
                    return (r.source = t), (r.subjectFactory = n), r;
                  })(t)
                );
                var e;
              })
            );
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              t instanceof uo
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const r = n.isBoundToModule ? void 0 : this._injector.get(Wt),
              s = n.create($s.NULL, [], e || n.selector, r);
            s.onDestroy(() => {
              this._unloadComponent(s);
            });
            const o = s.injector.get(Ii, null);
            return (
              o &&
                s.injector
                  .get(Oi)
                  .registerApplication(s.location.nativeElement, o),
              this._loadComponent(s),
              Kn() &&
                this._console.log(
                  "Angular is running in development mode. Call enableProdMode() to enable production mode."
                ),
              s
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
              if (this._enforceNoNewChanges)
                for (let t of this._views) t.checkNoChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            $i(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(li, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          _unloadComponent(t) {
            this.detachView(t.hostView), $i(this.components, t);
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy());
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Vt(xi), Vt(ci), Vt($s), Vt(Gn), Vt(po), Vt(ni));
          }),
          (t.ɵprov = it({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function $i(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      class Vi {}
      class qi {}
      const Bi = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      let Gi = (() => {
        class t {
          constructor(t, e) {
            (this._compiler = t), (this._config = e || Bi);
          }
          load(t) {
            return this.loadAndCompile(t);
          }
          loadAndCompile(t) {
            let [e, r] = t.split("#");
            return (
              void 0 === r && (r = "default"),
              n("zn8P")(e)
                .then((t) => t[r])
                .then((t) => Wi(t, e, r))
                .then((t) => this._compiler.compileModuleAsync(t))
            );
          }
          loadFactory(t) {
            let [e, r] = t.split("#"),
              s = "NgFactory";
            return (
              void 0 === r && ((r = "default"), (s = "")),
              n("zn8P")(
                this._config.factoryPathPrefix +
                  e +
                  this._config.factoryPathSuffix
              )
                .then((t) => t[r + s])
                .then((t) => Wi(t, e, r))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Vt(wi), Vt(qi, 8));
          }),
          (t.ɵprov = it({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Wi(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      const Zi = Hi(null, "core", [
          { provide: ai, useValue: "unknown" },
          { provide: Li, deps: [$s] },
          { provide: Oi, deps: [] },
          { provide: ci, deps: [] },
        ]),
        Qi = [
          { provide: zi, useClass: zi, deps: [xi, ci, $s, Gn, po, ni] },
          {
            provide: zo,
            deps: [xi],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: ni, useClass: ni, deps: [[new et(), ei]] },
          { provide: wi, useClass: wi, deps: [] },
          si,
          {
            provide: Oo,
            useFactory: function () {
              return No;
            },
            deps: [],
          },
          {
            provide: Po,
            useFactory: function () {
              return Uo;
            },
            deps: [],
          },
          {
            provide: ui,
            useFactory: function (t) {
              return (
                Ko(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    "en-US")
                ),
                t
              );
            },
            deps: [[new tt(ui), new et(), new rt()]],
          },
          { provide: hi, useValue: "USD" },
        ];
      let Ki = (() => {
          class t {
            constructor(t) {}
          }
          return (
            (t.ɵmod = ae({ type: t })),
            (t.ɵinj = at({
              factory: function (e) {
                return new (e || t)(Vt(zi));
              },
              providers: Qi,
            })),
            t
          );
        })(),
        Ji = null;
      function Yi() {
        return Ji;
      }
      const Xi = new jt("DocumentToken");
      let ta = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = it({ factory: ea, token: t, providedIn: "platform" })),
          t
        );
      })();
      function ea() {
        return Vt(ra);
      }
      const na = new jt("Location Initialized");
      let ra = (() => {
        class t extends ta {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = Yi().getLocation()),
              (this._history = Yi().getHistory());
          }
          getBaseHrefFromDOM() {
            return Yi().getBaseHref(this._doc);
          }
          onPopState(t) {
            Yi()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("popstate", t, !1);
          }
          onHashChange(t) {
            Yi()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("hashchange", t, !1);
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, e, n) {
            sa() ? this._history.pushState(t, e, n) : (this.location.hash = n);
          }
          replaceState(t, e, n) {
            sa()
              ? this._history.replaceState(t, e, n)
              : (this.location.hash = n);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Vt(Xi));
          }),
          (t.ɵprov = it({ factory: oa, token: t, providedIn: "platform" })),
          t
        );
      })();
      function sa() {
        return !!window.history.pushState;
      }
      function oa() {
        return new ra(Vt(Xi));
      }
      function ia(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith("/") && n++,
          e.startsWith("/") && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        );
      }
      function aa(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function la(t) {
        return t && "?" !== t[0] ? "?" + t : t;
      }
      let ca = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = it({ factory: ua, token: t, providedIn: "root" })),
          t
        );
      })();
      function ua(t) {
        const e = Vt(Xi).location;
        return new da(Vt(ta), (e && e.origin) || "");
      }
      const ha = new jt("appBaseHref");
      let da = (() => {
          class t extends ca {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = e;
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return ia(this._baseHref, t);
            }
            path(t = !1) {
              const e =
                  this._platformLocation.pathname +
                  la(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? `${e}${n}` : e;
            }
            pushState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + la(r));
              this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + la(r));
              this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Vt(ta), Vt(ha, 8));
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        pa = (() => {
          class t extends ca {
            constructor(t, e) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                null != e && (this._baseHref = e);
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let e = this._platformLocation.hash;
              return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e;
            }
            prepareExternalUrl(t) {
              const e = ia(this._baseHref, t);
              return e.length > 0 ? "#" + e : e;
            }
            pushState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + la(r));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + la(r));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Vt(ta), Vt(ha, 8));
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        fa = (() => {
          class t {
            constructor(t, e) {
              (this._subject = new ti()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
              const n = this._platformStrategy.getBaseHref();
              (this._platformLocation = e),
                (this._baseHref = aa(ma(n))),
                this._platformStrategy.onPopState((t) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: t.state,
                    type: t.type,
                  });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, e = "") {
              return this.path() == this.normalize(t + la(e));
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, ma(e))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, e = "", n = null) {
              this._platformStrategy.pushState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + la(e)),
                  n
                );
            }
            replaceState(t, e = "", n = null) {
              this._platformStrategy.replaceState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + la(e)),
                  n
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((t) => {
                    this._notifyUrlChangeListeners(t.url, t.state);
                  }));
            }
            _notifyUrlChangeListeners(t = "", e) {
              this._urlChangeListeners.forEach((n) => n(t, e));
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({
                next: t,
                error: e,
                complete: n,
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Vt(ca), Vt(ta));
            }),
            (t.normalizeQueryParams = la),
            (t.joinWithSlash = ia),
            (t.stripTrailingSlash = aa),
            (t.ɵprov = it({ factory: ga, token: t, providedIn: "root" })),
            t
          );
        })();
      function ga() {
        return new fa(Vt(ca), Vt(ta));
      }
      function ma(t) {
        return t.replace(/\/index.html$/, "");
      }
      var ya = (function (t) {
        return (
          (t[(t.Zero = 0)] = "Zero"),
          (t[(t.One = 1)] = "One"),
          (t[(t.Two = 2)] = "Two"),
          (t[(t.Few = 3)] = "Few"),
          (t[(t.Many = 4)] = "Many"),
          (t[(t.Other = 5)] = "Other"),
          t
        );
      })({});
      class va {}
      let wa = (() => {
        class t extends va {
          constructor(t) {
            super(), (this.locale = t);
          }
          getPluralCategory(t, e) {
            switch (
              (function (t) {
                return (function (t) {
                  const e = (function (t) {
                    return t.toLowerCase().replace(/_/g, "-");
                  })(t);
                  let n = Wo(e);
                  if (n) return n;
                  const r = e.split("-")[0];
                  if (((n = Wo(r)), n)) return n;
                  if ("en" === r) return Bo;
                  throw new Error(`Missing locale data for the locale "${t}".`);
                })(t)[Zo.PluralCase];
              })(e || this.locale)(t)
            ) {
              case ya.Zero:
                return "zero";
              case ya.One:
                return "one";
              case ya.Two:
                return "two";
              case ya.Few:
                return "few";
              case ya.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Vt(ui));
          }),
          (t.ɵprov = it({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function _a(t, e) {
        e = encodeURIComponent(e);
        for (const n of t.split(";")) {
          const t = n.indexOf("="),
            [r, s] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
          if (r.trim() === e) return decodeURIComponent(s);
        }
        return null;
      }
      let ba = (() => {
          class t {}
          return (
            (t.ɵmod = ae({ type: t })),
            (t.ɵinj = at({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [{ provide: va, useClass: wa }],
            })),
            t
          );
        })(),
        xa = (() => {
          class t {}
          return (
            (t.ɵprov = it({
              token: t,
              providedIn: "root",
              factory: () => new Sa(Vt(Xi), window, Vt(Gn)),
            })),
            t
          );
        })();
      class Sa {
        constructor(t, e, n) {
          (this.document = t),
            (this.window = e),
            (this.errorHandler = n),
            (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.scrollX, this.window.scrollY]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (this.supportsScrolling()) {
            const e =
              this.document.getElementById(t) ||
              this.document.getElementsByName(t)[0];
            e && this.scrollToElement(e);
          }
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(n - s[0], r - s[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.window || !this.window.scrollTo) return !1;
            const t =
              Ca(this.window.history) ||
              Ca(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch (t) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return !!this.window.scrollTo;
          } catch (t) {
            return !1;
          }
        }
      }
      function Ca(t) {
        return Object.getOwnPropertyDescriptor(t, "scrollRestoration");
      }
      class Ea extends class extends class {} {
        constructor() {
          super();
        }
        supportsDOMEvents() {
          return !0;
        }
      } {
        static makeCurrent() {
          var t;
          (t = new Ea()), Ji || (Ji = t);
        }
        getProperty(t, e) {
          return t[e];
        }
        log(t) {
          window.console && window.console.log && window.console.log(t);
        }
        logGroup(t) {
          window.console && window.console.group && window.console.group(t);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          return t.parentNode && t.parentNode.removeChild(t), t;
        }
        getValue(t) {
          return t.value;
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(t) {
          const e =
            ka || ((ka = document.querySelector("base")), ka)
              ? ka.getAttribute("href")
              : null;
          return null == e
            ? null
            : ((n = e),
              Ta || (Ta = document.createElement("a")),
              Ta.setAttribute("href", n),
              "/" === Ta.pathname.charAt(0) ? Ta.pathname : "/" + Ta.pathname);
          var n;
        }
        resetBaseElement() {
          ka = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(t) {
          return _a(document.cookie, t);
        }
      }
      let Ta,
        ka = null;
      const Aa = new jt("TRANSITION_ID"),
        Ra = [
          {
            provide: ei,
            useFactory: function (t, e, n) {
              return () => {
                n.get(ni).donePromise.then(() => {
                  const n = Yi();
                  Array.prototype.slice
                    .apply(e.querySelectorAll("style[ng-transition]"))
                    .filter((e) => e.getAttribute("ng-transition") === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [Aa, Xi, $s],
            multi: !0,
          },
        ];
      class Ia {
        static init() {
          var t;
          (t = new Ia()), (Ni = t);
        }
        addToWindow(t) {
          (Et.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n);
            if (null == r)
              throw new Error("Could not find testability for element.");
            return r;
          }),
            (Et.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (Et.getAllAngularRootElements = () => t.getAllRootElements()),
            Et.frameworkStabilizers || (Et.frameworkStabilizers = []),
            Et.frameworkStabilizers.push((t) => {
              const e = Et.getAllAngularTestabilities();
              let n = e.length,
                r = !1;
              const s = function (e) {
                (r = r || e), n--, 0 == n && t(r);
              };
              e.forEach(function (t) {
                t.whenStable(s);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const r = t.getTestability(e);
          return null != r
            ? r
            : n
            ? Yi().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      const Oa = new jt("EventManagerPlugins");
      let Pa = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let r = 0; r < n.length; r++) {
              const e = n[r];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error("No event manager plugin found for event " + t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Vt(Oa), Vt(xi));
          }),
          (t.ɵprov = it({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class ja {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const r = Yi().getGlobalEventTarget(this._doc, t);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, n);
        }
      }
      let Na = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Ua = (() => {
          class t extends Na {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(t.head);
            }
            _addStylesToHost(t, e) {
              t.forEach((t) => {
                const n = this._doc.createElement("style");
                (n.textContent = t), this._styleNodes.add(e.appendChild(n));
              });
            }
            addHost(t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }
            removeHost(t) {
              this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e) => this._addStylesToHost(t, e));
            }
            ngOnDestroy() {
              this._styleNodes.forEach((t) => Yi().remove(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Vt(Xi));
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Da = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        Ha = /%COMP%/g;
      function Ma(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let s = e[r];
          Array.isArray(s) ? Ma(t, s, n) : ((s = s.replace(Ha, t)), n.push(s));
        }
        return n;
      }
      function La(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let Fa = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new za(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case Xt.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new $a(
                      this.eventManager,
                      this.sharedStylesHost,
                      e,
                      this.appId
                    )),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case Xt.Native:
              case Xt.ShadowDom:
                return new Va(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = Ma(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Vt(Pa), Vt(Ua), Vt(ri));
          }),
          (t.ɵprov = it({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class za {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(Da[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t;
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, r) {
          if (r) {
            e = r + ":" + e;
            const s = Da[r];
            s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const r = Da[n];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, r) {
          r & yo.DashCase
            ? t.style.setProperty(e, n, r & yo.Important ? "important" : "")
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & yo.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, La(n))
            : this.eventManager.addEventListener(t, e, La(n));
        }
      }
      class $a extends za {
        constructor(t, e, n, r) {
          super(t), (this.component = n);
          const s = Ma(r + "-" + n.id, n.styles, []);
          e.addStyles(s),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              Ha,
              r + "-" + n.id
            )),
            (this.hostAttr = (function (t) {
              return "_nghost-%COMP%".replace(Ha, t);
            })(r + "-" + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class Va extends za {
        constructor(t, e, n, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.component = r),
            (this.shadowRoot =
              r.encapsulation === Xt.ShadowDom
                ? n.attachShadow({ mode: "open" })
                : n.createShadowRoot()),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = Ma(r.id, r.styles, []);
          for (let o = 0; o < s.length; o++) {
            const t = document.createElement("style");
            (t.textContent = s[o]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let qa = (() => {
        class t extends ja {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return (
              t.addEventListener(e, n, !1),
              () => this.removeEventListener(t, e, n)
            );
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Vt(Xi));
          }),
          (t.ɵprov = it({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Ba = ["alt", "control", "meta", "shift"],
        Ga = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Wa = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        Za = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let Qa = (() => {
        class t extends ja {
          constructor(t) {
            super(t);
          }
          supports(e) {
            return null != t.parseEventName(e);
          }
          addEventListener(e, n, r) {
            const s = t.parseEventName(n),
              o = t.eventCallback(s.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Yi().onAndCancel(e, s.domEventName, o));
          }
          static parseEventName(e) {
            const n = e.toLowerCase().split("."),
              r = n.shift();
            if (0 === n.length || ("keydown" !== r && "keyup" !== r))
              return null;
            const s = t._normalizeKey(n.pop());
            let o = "";
            if (
              (Ba.forEach((t) => {
                const e = n.indexOf(t);
                e > -1 && (n.splice(e, 1), (o += t + "."));
              }),
              (o += s),
              0 != n.length || 0 === s.length)
            )
              return null;
            const i = {};
            return (i.domEventName = r), (i.fullKey = o), i;
          }
          static getEventFullKey(t) {
            let e = "",
              n = (function (t) {
                let e = t.key;
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && Wa.hasOwnProperty(e) && (e = Wa[e]));
                }
                return Ga[e] || e;
              })(t);
            return (
              (n = n.toLowerCase()),
              " " === n ? (n = "space") : "." === n && (n = "dot"),
              Ba.forEach((r) => {
                r != n && (0, Za[r])(t) && (e += r + ".");
              }),
              (e += n),
              e
            );
          }
          static eventCallback(e, n, r) {
            return (s) => {
              t.getEventFullKey(s) === e && r.runGuarded(() => n(s));
            };
          }
          static _normalizeKey(t) {
            switch (t) {
              case "esc":
                return "escape";
              default:
                return t;
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Vt(Xi));
          }),
          (t.ɵprov = it({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Ka = Hi(Zi, "browser", [
          { provide: ai, useValue: "browser" },
          {
            provide: ii,
            useValue: function () {
              Ea.makeCurrent(), Ia.init();
            },
            multi: !0,
          },
          {
            provide: Xi,
            useFactory: function () {
              return (
                (function (t) {
                  Te = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Ja = [
          [],
          { provide: Rs, useValue: "root" },
          {
            provide: Gn,
            useFactory: function () {
              return new Gn();
            },
            deps: [],
          },
          { provide: Oa, useClass: qa, multi: !0, deps: [Xi, xi, ai] },
          { provide: Oa, useClass: Qa, multi: !0, deps: [Xi] },
          [],
          { provide: Fa, useClass: Fa, deps: [Pa, Ua, ri] },
          { provide: mo, useExisting: Fa },
          { provide: Na, useExisting: Ua },
          { provide: Ua, useClass: Ua, deps: [Xi] },
          { provide: Ii, useClass: Ii, deps: [xi] },
          { provide: Pa, useClass: Pa, deps: [Oa, xi] },
          [],
        ];
      let Ya = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: ri, useValue: e.appId },
                { provide: Aa, useExisting: ri },
                Ra,
              ],
            };
          }
        }
        return (
          (t.ɵmod = ae({ type: t })),
          (t.ɵinj = at({
            factory: function (e) {
              return new (e || t)(Vt(t, 12));
            },
            providers: Ja,
            imports: [ba, Ki],
          })),
          t
        );
      })();
      function Xa(...t) {
        let e = t[t.length - 1];
        return E(e) ? (t.pop(), M(t, e)) : q(t);
      }
      function tl(t, e) {
        return F(t, e, 1);
      }
      function el(t, e) {
        return function (n) {
          return n.lift(new nl(t, e));
        };
      }
      "undefined" != typeof window && window;
      class nl {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new rl(t, this.predicate, this.thisArg));
        }
      }
      class rl extends f {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
      class sl {}
      class ol {}
      class il {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((t) => {
                            const e = t.indexOf(":");
                            if (e > 0) {
                              const n = t.slice(0, e),
                                r = n.toLowerCase(),
                                s = t.slice(e + 1).trim();
                              this.maybeSetNormalizedName(n, r),
                                this.headers.has(r)
                                  ? this.headers.get(r).push(s)
                                  : this.headers.set(r, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((e) => {
                            let n = t[e];
                            const r = e.toLowerCase();
                            "string" == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(r, n),
                                this.maybeSetNormalizedName(e, r));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: "d" });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof il
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((e) => {
              this.headers.set(e, t.headers.get(e)),
                this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new il();
          return (
            (e.lazyInit =
              this.lazyInit && this.lazyInit instanceof il
                ? this.lazyInit
                : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let n = t.value;
              if (("string" == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const r = ("a" === t.op ? this.headers.get(e) : void 0) || [];
              r.push(...n), this.headers.set(e, r);
              break;
            case "d":
              const s = t.value;
              if (s) {
                let t = this.headers.get(e);
                if (!t) return;
                (t = t.filter((t) => -1 === s.indexOf(t))),
                  0 === t.length
                    ? (this.headers.delete(e), this.normalizedNames.delete(e))
                    : this.headers.set(e, t);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((e) =>
              t(this.normalizedNames.get(e), this.headers.get(e))
            );
        }
      }
      class al {
        encodeKey(t) {
          return ll(t);
        }
        encodeValue(t) {
          return ll(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      function ll(t) {
        return encodeURIComponent(t)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/gi, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%2B/gi, "+")
          .replace(/%3D/gi, "=")
          .replace(/%3F/gi, "?")
          .replace(/%2F/gi, "/");
      }
      class cl {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new al()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function (t, e) {
              const n = new Map();
              return (
                t.length > 0 &&
                  t.split("&").forEach((t) => {
                    const r = t.indexOf("="),
                      [s, o] =
                        -1 == r
                          ? [e.decodeKey(t), ""]
                          : [
                              e.decodeKey(t.slice(0, r)),
                              e.decodeValue(t.slice(r + 1)),
                            ],
                      i = n.get(s) || [];
                    i.push(o), n.set(s, i);
                  }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((e) => {
                  const n = t.fromObject[e];
                  this.map.set(e, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((t) => e + "=" + this.encoder.encodeValue(t))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const e = new cl({ encoder: this.encoder });
          return (
            (e.cloneFrom = this.cloneFrom || this),
            (e.updates = (this.updates || []).concat([t])),
            e
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const e =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push(t.value), this.map.set(t.param, e);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let e = this.map.get(t.param) || [];
                      const n = e.indexOf(t.value);
                      -1 !== n && e.splice(n, 1),
                        e.length > 0
                          ? this.map.set(t.param, e)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      function ul(t) {
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer;
      }
      function hl(t) {
        return "undefined" != typeof Blob && t instanceof Blob;
      }
      function dl(t) {
        return "undefined" != typeof FormData && t instanceof FormData;
      }
      class pl {
        constructor(t, e, n, r) {
          let s;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function (t) {
              switch (t) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || r
              ? ((this.body = void 0 !== n ? n : null), (s = r))
              : (s = n),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new il()),
            this.params)
          ) {
            const t = this.params.toString();
            if (0 === t.length) this.urlWithParams = e;
            else {
              const n = e.indexOf("?");
              this.urlWithParams =
                e + (-1 === n ? "?" : n < e.length - 1 ? "&" : "") + t;
            }
          } else (this.params = new cl()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : ul(this.body) ||
              hl(this.body) ||
              dl(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof cl
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || dl(this.body)
            ? null
            : hl(this.body)
            ? this.body.type || null
            : ul(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof cl
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              Array.isArray(this.body)
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const e = t.method || this.method,
            n = t.url || this.url,
            r = t.responseType || this.responseType,
            s = void 0 !== t.body ? t.body : this.body,
            o =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            i =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let a = t.headers || this.headers,
            l = t.params || this.params;
          return (
            void 0 !== t.setHeaders &&
              (a = Object.keys(t.setHeaders).reduce(
                (e, n) => e.set(n, t.setHeaders[n]),
                a
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (e, n) => e.set(n, t.setParams[n]),
                l
              )),
            new pl(e, n, s, {
              params: l,
              headers: a,
              reportProgress: i,
              responseType: r,
              withCredentials: o,
            })
          );
        }
      }
      var fl = (function (t) {
        return (
          (t[(t.Sent = 0)] = "Sent"),
          (t[(t.UploadProgress = 1)] = "UploadProgress"),
          (t[(t.ResponseHeader = 2)] = "ResponseHeader"),
          (t[(t.DownloadProgress = 3)] = "DownloadProgress"),
          (t[(t.Response = 4)] = "Response"),
          (t[(t.User = 5)] = "User"),
          t
        );
      })({});
      class gl {
        constructor(t, e = 200, n = "OK") {
          (this.headers = t.headers || new il()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || n),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class ml extends gl {
        constructor(t = {}) {
          super(t), (this.type = fl.ResponseHeader);
        }
        clone(t = {}) {
          return new ml({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class yl extends gl {
        constructor(t = {}) {
          super(t),
            (this.type = fl.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new yl({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class vl extends gl {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? "Http failure during parsing for " +
                  (t.url || "(unknown url)")
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function wl(t, e) {
        return {
          body: e,
          headers: t.headers,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        };
      }
      let _l = (() => {
        class t {
          constructor(t) {
            this.handler = t;
          }
          request(t, e, n = {}) {
            let r;
            if (t instanceof pl) r = t;
            else {
              let s = void 0;
              s = n.headers instanceof il ? n.headers : new il(n.headers);
              let o = void 0;
              n.params &&
                (o =
                  n.params instanceof cl
                    ? n.params
                    : new cl({ fromObject: n.params })),
                (r = new pl(t, e, void 0 !== n.body ? n.body : null, {
                  headers: s,
                  params: o,
                  reportProgress: n.reportProgress,
                  responseType: n.responseType || "json",
                  withCredentials: n.withCredentials,
                }));
            }
            const s = Xa(r).pipe(tl((t) => this.handler.handle(t)));
            if (t instanceof pl || "events" === n.observe) return s;
            const o = s.pipe(el((t) => t instanceof yl));
            switch (n.observe || "body") {
              case "body":
                switch (r.responseType) {
                  case "arraybuffer":
                    return o.pipe(
                      U((t) => {
                        if (null !== t.body && !(t.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return t.body;
                      })
                    );
                  case "blob":
                    return o.pipe(
                      U((t) => {
                        if (null !== t.body && !(t.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return t.body;
                      })
                    );
                  case "text":
                    return o.pipe(
                      U((t) => {
                        if (null !== t.body && "string" != typeof t.body)
                          throw new Error("Response is not a string.");
                        return t.body;
                      })
                    );
                  case "json":
                  default:
                    return o.pipe(U((t) => t.body));
                }
              case "response":
                return o;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${n.observe}}`
                );
            }
          }
          delete(t, e = {}) {
            return this.request("DELETE", t, e);
          }
          get(t, e = {}) {
            return this.request("GET", t, e);
          }
          head(t, e = {}) {
            return this.request("HEAD", t, e);
          }
          jsonp(t, e) {
            return this.request("JSONP", t, {
              params: new cl().append(e, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, e = {}) {
            return this.request("OPTIONS", t, e);
          }
          patch(t, e, n = {}) {
            return this.request("PATCH", t, wl(n, e));
          }
          post(t, e, n = {}) {
            return this.request("POST", t, wl(n, e));
          }
          put(t, e, n = {}) {
            return this.request("PUT", t, wl(n, e));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Vt(sl));
          }),
          (t.ɵprov = it({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class bl {
        constructor(t, e) {
          (this.next = t), (this.interceptor = e);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const xl = new jt("HTTP_INTERCEPTORS");
      let Sl = (() => {
        class t {
          intercept(t, e) {
            return e.handle(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = it({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Cl = /^\)\]\}',?\n/;
      class El {}
      let Tl = (() => {
          class t {
            constructor() {}
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        kl = (() => {
          class t {
            constructor(t) {
              this.xhrFactory = t;
            }
            handle(t) {
              if ("JSONP" === t.method)
                throw new Error(
                  "Attempted to construct Jsonp request without JsonpClientModule installed."
                );
              return new v((e) => {
                const n = this.xhrFactory.build();
                if (
                  (n.open(t.method, t.urlWithParams),
                  t.withCredentials && (n.withCredentials = !0),
                  t.headers.forEach((t, e) =>
                    n.setRequestHeader(t, e.join(","))
                  ),
                  t.headers.has("Accept") ||
                    n.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !t.headers.has("Content-Type"))
                ) {
                  const e = t.detectContentTypeHeader();
                  null !== e && n.setRequestHeader("Content-Type", e);
                }
                if (t.responseType) {
                  const e = t.responseType.toLowerCase();
                  n.responseType = "json" !== e ? e : "text";
                }
                const r = t.serializeBody();
                let s = null;
                const o = () => {
                    if (null !== s) return s;
                    const e = 1223 === n.status ? 204 : n.status,
                      r = n.statusText || "OK",
                      o = new il(n.getAllResponseHeaders()),
                      i =
                        (function (t) {
                          return "responseURL" in t && t.responseURL
                            ? t.responseURL
                            : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
                            ? t.getResponseHeader("X-Request-URL")
                            : null;
                        })(n) || t.url;
                    return (
                      (s = new ml({
                        headers: o,
                        status: e,
                        statusText: r,
                        url: i,
                      })),
                      s
                    );
                  },
                  i = () => {
                    let { headers: r, status: s, statusText: i, url: a } = o(),
                      l = null;
                    204 !== s &&
                      (l = void 0 === n.response ? n.responseText : n.response),
                      0 === s && (s = l ? 200 : 0);
                    let c = s >= 200 && s < 300;
                    if ("json" === t.responseType && "string" == typeof l) {
                      const t = l;
                      l = l.replace(Cl, "");
                      try {
                        l = "" !== l ? JSON.parse(l) : null;
                      } catch (u) {
                        (l = t), c && ((c = !1), (l = { error: u, text: l }));
                      }
                    }
                    c
                      ? (e.next(
                          new yl({
                            body: l,
                            headers: r,
                            status: s,
                            statusText: i,
                            url: a || void 0,
                          })
                        ),
                        e.complete())
                      : e.error(
                          new vl({
                            error: l,
                            headers: r,
                            status: s,
                            statusText: i,
                            url: a || void 0,
                          })
                        );
                  },
                  a = (t) => {
                    const { url: r } = o(),
                      s = new vl({
                        error: t,
                        status: n.status || 0,
                        statusText: n.statusText || "Unknown Error",
                        url: r || void 0,
                      });
                    e.error(s);
                  };
                let l = !1;
                const c = (r) => {
                    l || (e.next(o()), (l = !0));
                    let s = { type: fl.DownloadProgress, loaded: r.loaded };
                    r.lengthComputable && (s.total = r.total),
                      "text" === t.responseType &&
                        n.responseText &&
                        (s.partialText = n.responseText),
                      e.next(s);
                  },
                  u = (t) => {
                    let n = { type: fl.UploadProgress, loaded: t.loaded };
                    t.lengthComputable && (n.total = t.total), e.next(n);
                  };
                return (
                  n.addEventListener("load", i),
                  n.addEventListener("error", a),
                  t.reportProgress &&
                    (n.addEventListener("progress", c),
                    null !== r &&
                      n.upload &&
                      n.upload.addEventListener("progress", u)),
                  n.send(r),
                  e.next({ type: fl.Sent }),
                  () => {
                    n.removeEventListener("error", a),
                      n.removeEventListener("load", i),
                      t.reportProgress &&
                        (n.removeEventListener("progress", c),
                        null !== r &&
                          n.upload &&
                          n.upload.removeEventListener("progress", u)),
                      n.readyState !== n.DONE && n.abort();
                  }
                );
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Vt(El));
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Al = new jt("XSRF_COOKIE_NAME"),
        Rl = new jt("XSRF_HEADER_NAME");
      class Il {}
      let Ol = (() => {
          class t {
            constructor(t, e, n) {
              (this.doc = t),
                (this.platform = e),
                (this.cookieName = n),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const t = this.doc.cookie || "";
              return (
                t !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = _a(t, this.cookieName)),
                  (this.lastCookieString = t)),
                this.lastToken
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Vt(Xi), Vt(ai), Vt(Al));
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Pl = (() => {
          class t {
            constructor(t, e) {
              (this.tokenService = t), (this.headerName = e);
            }
            intercept(t, e) {
              const n = t.url.toLowerCase();
              if (
                "GET" === t.method ||
                "HEAD" === t.method ||
                n.startsWith("http://") ||
                n.startsWith("https://")
              )
                return e.handle(t);
              const r = this.tokenService.getToken();
              return (
                null === r ||
                  t.headers.has(this.headerName) ||
                  (t = t.clone({ headers: t.headers.set(this.headerName, r) })),
                e.handle(t)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Vt(Il), Vt(Rl));
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        jl = (() => {
          class t {
            constructor(t, e) {
              (this.backend = t), (this.injector = e), (this.chain = null);
            }
            handle(t) {
              if (null === this.chain) {
                const t = this.injector.get(xl, []);
                this.chain = t.reduceRight(
                  (t, e) => new bl(t, e),
                  this.backend
                );
              }
              return this.chain.handle(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Vt(ol), Vt($s));
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Nl = (() => {
          class t {
            static disable() {
              return {
                ngModule: t,
                providers: [{ provide: Pl, useClass: Sl }],
              };
            }
            static withOptions(e = {}) {
              return {
                ngModule: t,
                providers: [
                  e.cookieName ? { provide: Al, useValue: e.cookieName } : [],
                  e.headerName ? { provide: Rl, useValue: e.headerName } : [],
                ],
              };
            }
          }
          return (
            (t.ɵmod = ae({ type: t })),
            (t.ɵinj = at({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [
                Pl,
                { provide: xl, useExisting: Pl, multi: !0 },
                { provide: Il, useClass: Ol },
                { provide: Al, useValue: "XSRF-TOKEN" },
                { provide: Rl, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            t
          );
        })(),
        Ul = (() => {
          class t {}
          return (
            (t.ɵmod = ae({ type: t })),
            (t.ɵinj = at({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [
                _l,
                { provide: sl, useClass: jl },
                kl,
                { provide: ol, useExisting: kl },
                Tl,
                { provide: El, useExisting: Tl },
              ],
              imports: [
                [
                  Nl.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN",
                  }),
                ],
              ],
            })),
            t
          );
        })(),
        Dl = (() => {
          class t {
            constructor() {
              this.datosPersonales = {
                facebook: "",
                twitter: "",
                whatsapp: "+541141711760",
                direccion: "Padre Nuestro 1168 - General Pacheco",
                email: "info@transportenortruck.com.ar",
              };
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        Hl = (() => {
          class t {
            constructor(t) {
              this.info = t;
            }
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Js(Dl));
            }),
            (t.ɵcmp = re({
              type: t,
              selectors: [["app-contact"]],
              decls: 46,
              vars: 3,
              consts: [
                ["id", "contact", 1, "contact"],
                [1, "container"],
                [1, "row"],
                [2, "width", "100%"],
                [
                  "width",
                  "100%",
                  "height",
                  "600",
                  "frameborder",
                  "0",
                  "scrolling",
                  "no",
                  "marginheight",
                  "0",
                  "marginwidth",
                  "0",
                  "src",
                  "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Padre%20Nuestro%201168%20-%20General%20Pacheco+(Transporte%20Nortruck)&t=&z=14&ie=UTF8&iwloc=B&output=embed",
                ],
                [1, "heading"],
                [1, "headul"],
                [1, "subheading"],
                [1, "col-lg-6", "col-md-6", "col-sm-6", "col-xs-12"],
                ["action", "mail.php", "method", "POST"],
                ["type", "text", "name", "name"],
                ["type", "text", "name", "email"],
                ["name", "message", "rows", "6", "cols", "25"],
                ["type", "submit", "value", "Send"],
                ["type", "reset", "value", "Clear"],
                [
                  1,
                  "col-lg-5",
                  "col-md-5",
                  "col-sm-5",
                  "col-xs-12",
                  "col-lg-offset-1",
                  "col-md-offset-1",
                  "col-sm-offset-1",
                  "col-xs-offset-0",
                  "contact-full-info",
                ],
                [
                  "href",
                  "https://api.whatsapp.com/send?phone=541141711760&text=hola,%20\xbfc\xf3mo%20est\xe1s?%20quer\xeda%20consultarte: ",
                  1,
                  "btn",
                  "btn-primary-outline",
                  2,
                  "background",
                  "green",
                  "color",
                  "white",
                ],
                [
                  1,
                  "fa",
                  "fa-whatsapp",
                  2,
                  "font-size",
                  "25px",
                  "margin-right",
                  "15px",
                ],
                [1, "col-md-12", "col-sm-12", "col-xs-12"],
                ["id", "contact-map", 1, "gmap"],
              ],
              template: function (t, e) {
                1 & t &&
                  (Xs(0, "section", 0),
                  Xs(1, "div", 1),
                  eo(2, "div", 2),
                  Xs(3, "div", 2),
                  Xs(4, "div", 3),
                  eo(5, "iframe", 4),
                  to(),
                  Xs(6, "h1", 5),
                  io(7, "Cont\xe1ctanos"),
                  to(),
                  eo(8, "div", 6),
                  Xs(9, "p", 7),
                  io(
                    10,
                    " Si deseas ponerte en contacto, escribinos un mensaje o por WhatsApp "
                  ),
                  to(),
                  Xs(11, "div", 8),
                  Xs(12, "div", 2),
                  Xs(13, "form", 9),
                  Xs(14, "p"),
                  io(15, "Name"),
                  to(),
                  eo(16, "input", 10),
                  Xs(17, "p"),
                  io(18, "Email"),
                  to(),
                  eo(19, "input", 11),
                  Xs(20, "p"),
                  io(21, "Message"),
                  to(),
                  eo(22, "textarea", 12),
                  eo(23, "br"),
                  eo(24, "input", 13),
                  eo(25, "input", 14),
                  to(),
                  to(),
                  to(),
                  Xs(26, "div", 15),
                  Xs(27, "h5"),
                  io(28, "Contacto"),
                  to(),
                  Xs(29, "p"),
                  eo(30, "br"),
                  io(31),
                  eo(32, "br"),
                  eo(33, "br"),
                  io(34),
                  eo(35, "br"),
                  eo(36, "br"),
                  io(37),
                  eo(38, "br"),
                  Xs(39, "a", 16),
                  eo(40, "i", 17),
                  io(41, "Click ac\xe1 para escribirnos por Whatsapp"),
                  to(),
                  to(),
                  eo(42, "br"),
                  to(),
                  to(),
                  to(),
                  to(),
                  Xs(43, "div", 18),
                  Xs(44, "div", 2),
                  eo(45, "div", 19),
                  to(),
                  to()),
                  2 & t &&
                    (wr(31),
                    ao(
                      " Direcci\xf3n: ",
                      e.info.datosPersonales.direccion,
                      " "
                    ),
                    wr(3),
                    ao(" Email: ", e.info.datosPersonales.email, " "),
                    wr(3),
                    ao(" Tel\xe9fono: ", e.info.datosPersonales.whatsapp, " "));
              },
              styles: [
                "@media (max-width:825px){*[_ngcontent-%COMP%]{font-size:50px!important;font-weight:500}}@media (max-width:991.98px){*[_ngcontent-%COMP%]{font-size:25px!important;font-weight:500}.title[_ngcontent-%COMP%]{font-weight:800}}",
              ],
            })),
            t
          );
        })(),
        Ml = (() => {
          class t {
            constructor() {}
            ngOnInit() {
              jQuery(document).ready(function () {
                window.SHIPPING_SETTINGS &&
                  window.SHIPPING_SETTINGS.twitterCarousel &&
                  window.SHIPPING_SETTINGS.twitterCarousel();
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = re({
              type: t,
              selectors: [["app-servicios"]],
              decls: 127,
              vars: 0,
              consts: [
                ["id", "major-services", 1, "major-services", "gray-boxes"],
                [1, "container"],
                [1, "row"],
                [1, "heading", "title"],
                [1, "headul"],
                [1, "subheading"],
                [
                  "data-effect",
                  "fadeInUp",
                  1,
                  "col-lg-4",
                  "col-md-4",
                  "col-md-offset-0",
                  "col-sm-8",
                  "col-sm-offset-2",
                  "col-xs-10",
                  "col-xs-offset-1",
                  "service",
                  "inviewport",
                  "animated",
                  "delay1",
                ],
                [1, "service-wrap"],
                [1, "pic"],
                [
                  "alt",
                  "service-image",
                  "src",
                  "assets/img/service-1.png",
                  1,
                  "img-responsive",
                ],
                [1, "info-layer", "transition"],
                [
                  "title",
                  "Air Freight Service",
                  "data-fancybox-group",
                  "service-gallery",
                  "href",
                  "assets/img/service-1.png",
                  1,
                  "btn",
                  "btn-primary",
                  "fancybox",
                ],
                [1, "icon", "icon-image-area"],
                [1, "info"],
                [1, "title"],
                [1, "text-left"],
                [
                  "data-effect",
                  "fadeInUp",
                  1,
                  "col-lg-4",
                  "col-md-4",
                  "col-md-offset-0",
                  "col-sm-8",
                  "col-sm-offset-2",
                  "col-xs-10",
                  "col-xs-offset-1",
                  "service",
                  "inviewport",
                  "animated",
                  "delay2",
                ],
                [
                  "alt",
                  "service-image",
                  "src",
                  "assets/img/service-2.png",
                  1,
                  "img-responsive",
                ],
                [
                  "title",
                  "Roadway Freight Service",
                  "data-fancybox-group",
                  "service-gallery",
                  "href",
                  "assets/img/service-2.png",
                  1,
                  "btn",
                  "btn-primary",
                  "fancybox",
                ],
                [
                  "data-effect",
                  "fadeInUp",
                  1,
                  "col-lg-4",
                  "col-md-4",
                  "col-md-offset-0",
                  "col-sm-8",
                  "col-sm-offset-2",
                  "col-xs-10",
                  "col-xs-offset-1",
                  "service",
                  "inviewport",
                  "animated",
                  "delay3",
                ],
                [
                  "alt",
                  "service-image",
                  "src",
                  "assets/img/service-3.png",
                  1,
                  "img-responsive",
                ],
                [
                  "title",
                  "Ocean Freight Service",
                  "data-fancybox-group",
                  "service-gallery",
                  "href",
                  "assets/img/service-3.png",
                  1,
                  "btn",
                  "btn-primary",
                  "fancybox",
                ],
                ["id", "worldwide", 1, "bg-black"],
                [1, "heading", "text-white"],
                [1, "subheading", "text-white"],
                [1, "text-white", "text-center"],
                [1, "worldwide", "col-md-12", "col-xs-12", "mb-5"],
                [
                  "src",
                  "assets/img/wordlwidecentres.png",
                  "alt",
                  "Map image",
                  1,
                  "img-responsive",
                  2,
                  "width",
                  "100%",
                ],
                ["id", "estimate", 1, "estimate"],
                [1, "estimate-wrap"],
                [
                  1,
                  "col-lg-8",
                  "col-md-8",
                  "col-lg-offset-1",
                  "col-md-offset-1",
                  "col-sm-offset-1",
                  "col-sm-10",
                  "col-xs-offset-1",
                  "col-xs-10",
                ],
                [1, "heading", "left-align"],
                [1, "headul", "left-align"],
                [1, "subheading", "left-align"],
                [
                  1,
                  "col-lg-4",
                  "col-md-4",
                  "col-lg-offset-1",
                  "col-md-offset-1",
                  "col-sm-offset-1",
                  "col-sm-10",
                  "col-xs-offset-1",
                  "col-xs-10",
                ],
                ["action", "cotizar.php", "method", "post"],
                [1, "col-xs-12"],
                [
                  "type",
                  "text",
                  "name",
                  "origen",
                  "placeholder",
                  "Localidad de origen",
                  "id",
                  "origen",
                  1,
                  "transition",
                ],
                [
                  "type",
                  "text",
                  "name",
                  "destino",
                  "placeholder",
                  "Localidad de destino",
                  "id",
                  "destino",
                  1,
                  "transition",
                ],
                [
                  "type",
                  "text",
                  "name",
                  "peso",
                  "placeholder",
                  "Detalles de la carga",
                  "id",
                  "peso",
                  1,
                  "transition",
                ],
                [
                  "type",
                  "text",
                  "name",
                  "kilos",
                  "placeholder",
                  "Kilos de la mercader\xeda despachada",
                  "id",
                  "kilos",
                  1,
                  "transition",
                ],
                [
                  "type",
                  "text",
                  "name",
                  "valordeclarado",
                  "placeholder",
                  "Valor declarado para el seguro en $",
                  "id",
                  "valordeclarado",
                  1,
                  "transition",
                ],
                [
                  "type",
                  "text",
                  "name",
                  "name",
                  "placeholder",
                  "Nombre",
                  "id",
                  "nombre",
                  1,
                  "transition",
                ],
                [
                  "type",
                  "text",
                  "name",
                  "phone",
                  "placeholder",
                  "Tel\xe9fono de contacto",
                  "id",
                  "est_width",
                  1,
                  "transition",
                ],
                [
                  "type",
                  "text",
                  "name",
                  "email",
                  "placeholder",
                  "Correo electr\xf3nico",
                  "id",
                  "est_total",
                  1,
                  "transition",
                ],
                [1, "col-xs-4"],
                [
                  "type",
                  "submit",
                  "name",
                  "submit",
                  "value",
                  "Enviar",
                  "id",
                  "c_send",
                  1,
                  "btn",
                  "btn-primary",
                  "mb-5",
                ],
                [1, "col-lg-7", "col-md-7", "col-sm-12", "col-xs-12", "pic"],
                [
                  "src",
                  "assets/img/service_estimate.png",
                  "alt",
                  "Estimate Fork Image",
                  1,
                  "img-responsive",
                  "style-dependent",
                ],
              ],
              template: function (t, e) {
                1 & t &&
                  (Xs(0, "section", 0),
                  Xs(1, "div", 1),
                  Xs(2, "div", 2),
                  Xs(3, "h1", 3),
                  io(4, "Nuestros Servicios"),
                  to(),
                  eo(5, "div", 4),
                  eo(6, "p", 5),
                  Xs(7, "div", 6),
                  Xs(8, "div", 7),
                  Xs(9, "div", 8),
                  eo(10, "img", 9),
                  Xs(11, "div", 10),
                  Xs(12, "a", 11),
                  eo(13, "i", 12),
                  to(),
                  to(),
                  to(),
                  Xs(14, "div", 13),
                  Xs(15, "h4", 14),
                  io(16, "Cargas generales"),
                  to(),
                  eo(17, "br"),
                  Xs(18, "p"),
                  io(
                    19,
                    " Transportamos cargas completas desde y hacia cualquier punto del pa\xeds, com\xfan o catalogada IMDG hasta 28 y 29 toneladas. "
                  ),
                  to(),
                  eo(20, "br"),
                  Xs(21, "ul", 15),
                  Xs(22, "li"),
                  io(23, "Big bags"),
                  to(),
                  Xs(24, "li"),
                  io(25, "Cargas a granel"),
                  to(),
                  Xs(26, "li"),
                  io(27, "Cargas palletizadas"),
                  to(),
                  to(),
                  to(),
                  to(),
                  to(),
                  Xs(28, "div", 16),
                  Xs(29, "div", 7),
                  Xs(30, "div", 8),
                  eo(31, "img", 17),
                  Xs(32, "div", 10),
                  Xs(33, "a", 18),
                  eo(34, "i", 12),
                  to(),
                  to(),
                  to(),
                  Xs(35, "div", 13),
                  Xs(36, "h4", 14),
                  io(37, "CARGAS PELIGROSAS"),
                  to(),
                  eo(38, "br"),
                  Xs(39, "p"),
                  io(
                    40,
                    " Transportamos todo tipo de cargas peligrosas y precursores. Contamos con la inscripci\xf3n de Cedronar "
                  ),
                  to(),
                  eo(41, "br"),
                  eo(42, "br"),
                  eo(43, "br"),
                  eo(44, "br"),
                  eo(45, "br"),
                  to(),
                  to(),
                  to(),
                  Xs(46, "div", 19),
                  Xs(47, "div", 7),
                  Xs(48, "div", 8),
                  eo(49, "img", 20),
                  Xs(50, "div", 10),
                  Xs(51, "a", 21),
                  eo(52, "i", 12),
                  to(),
                  to(),
                  to(),
                  Xs(53, "div", 13),
                  Xs(54, "h4", 14),
                  io(55, "SEGUIMIENTO SATELITAL"),
                  to(),
                  Xs(56, "p"),
                  io(
                    57,
                    "Monitoreo satelital las 24hs los 365 d\xedas del a\xf1o."
                  ),
                  to(),
                  eo(58, "br"),
                  eo(59, "br"),
                  eo(60, "br"),
                  Xs(61, "ul", 15),
                  Xs(62, "li"),
                  io(63, "Acceso web para clientes"),
                  to(),
                  Xs(64, "li"),
                  io(65, "Interfaz clara y sencilla"),
                  to(),
                  Xs(66, "li"),
                  io(67, "Reportes hist\xf3ricos"),
                  to(),
                  to(),
                  to(),
                  to(),
                  to(),
                  to(),
                  to(),
                  to(),
                  Xs(68, "section", 22),
                  Xs(69, "div", 1),
                  Xs(70, "div", 2),
                  Xs(71, "h1", 23),
                  io(72, "Nuestros Servicios"),
                  to(),
                  eo(73, "div", 4),
                  Xs(74, "p", 24),
                  io(75, " Realizamos viajes a todo el territorio nacional "),
                  to(),
                  Xs(76, "p", 25),
                  io(77, " De Buenos Aires a C\xf3rdoba "),
                  to(),
                  Xs(78, "p", 25),
                  io(79, " De C\xf3rdoba a Buenos Aires "),
                  to(),
                  Xs(80, "p", 25),
                  io(81, " De Buenos Aires a Paran\xe1 "),
                  to(),
                  Xs(82, "p", 25),
                  io(83, " De Paran\xe1 a Buenos Aires "),
                  to(),
                  Xs(84, "div", 26),
                  Xs(85, "div"),
                  eo(86, "img", 27),
                  to(),
                  to(),
                  to(),
                  to(),
                  to(),
                  Xs(87, "section", 28),
                  Xs(88, "div", 29),
                  Xs(89, "div", 2),
                  Xs(90, "div", 30),
                  Xs(91, "h1", 31),
                  io(92, "Solicitud de presupuesto"),
                  to(),
                  eo(93, "div", 32),
                  Xs(94, "p", 33),
                  io(
                    95,
                    " Complete el siguiente formulario para solicitar una cotizaci\xf3n de env\xedo "
                  ),
                  to(),
                  to(),
                  Xs(96, "div", 34),
                  Xs(97, "div", 2),
                  Xs(98, "form", 35),
                  Xs(99, "div", 36),
                  eo(100, "label"),
                  eo(101, "input", 37),
                  to(),
                  Xs(102, "div", 36),
                  eo(103, "label"),
                  eo(104, "input", 38),
                  to(),
                  Xs(105, "div", 36),
                  eo(106, "label"),
                  eo(107, "input", 39),
                  to(),
                  Xs(108, "div", 36),
                  eo(109, "label"),
                  eo(110, "input", 40),
                  to(),
                  Xs(111, "div", 36),
                  eo(112, "label"),
                  eo(113, "input", 41),
                  to(),
                  Xs(114, "div", 36),
                  eo(115, "label"),
                  eo(116, "input", 42),
                  to(),
                  Xs(117, "div", 36),
                  eo(118, "label"),
                  eo(119, "input", 43),
                  to(),
                  Xs(120, "div", 36),
                  eo(121, "label"),
                  eo(122, "input", 44),
                  to(),
                  Xs(123, "div", 45),
                  eo(124, "input", 46),
                  to(),
                  to(),
                  to(),
                  to(),
                  Xs(125, "div", 47),
                  eo(126, "img", 48),
                  to(),
                  to(),
                  to(),
                  to());
              },
              styles: [
                "@media (max-width:825px){*[_ngcontent-%COMP%]{font-size:50px!important;font-weight:500}}@media (max-width:991.98px){*[_ngcontent-%COMP%]{font-size:25px!important;font-weight:500}.title[_ngcontent-%COMP%]{font-weight:800}}",
              ],
            })),
            t
          );
        })();
      class Ll extends S {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return e && !e.closed && t.next(this._value), e;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new _();
          return this._value;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const Fl = (() => {
          function t() {
            return (
              Error.call(this),
              (this.message = "no elements in sequence"),
              (this.name = "EmptyError"),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        zl = {};
      class $l {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, e) {
          return e.subscribe(new Vl(t, this.resultSelector));
        }
      }
      class Vl extends N {
        constructor(t, e) {
          super(t),
            (this.resultSelector = e),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(t) {
          this.values.push(zl), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            (this.active = e), (this.toRespond = e);
            for (let n = 0; n < e; n++) {
              const e = t[n];
              this.add(j(this, e, e, n));
            }
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, e, n, r, s) {
          const o = this.values,
            i = this.toRespond
              ? o[n] === zl
                ? --this.toRespond
                : this.toRespond
              : 0;
          (o[n] = e),
            0 === i &&
              (this.resultSelector
                ? this._tryResultSelector(o)
                : this.destination.next(o.slice()));
        }
        _tryResultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const ql = new v((t) => t.complete());
      function Bl(t) {
        return t
          ? (function (t) {
              return new v((e) => t.schedule(() => e.complete()));
            })(t)
          : ql;
      }
      function Gl(t) {
        return new v((e) => {
          let n;
          try {
            n = t();
          } catch (r) {
            return void e.error(r);
          }
          return (n ? L(n) : Bl()).subscribe(e);
        });
      }
      function Wl() {
        return V(1);
      }
      const Zl = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function Ql(t) {
        return function (e) {
          return 0 === t ? Bl() : e.lift(new Kl(t));
        };
      }
      class Kl {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Zl();
        }
        call(t, e) {
          return e.subscribe(new Jl(t, this.total));
        }
      }
      class Jl extends f {
        constructor(t, e) {
          super(t),
            (this.total = e),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            r = this.count++;
          e.length < n ? e.push(t) : (e[r % n] = t);
        }
        _complete() {
          const t = this.destination;
          let e = this.count;
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              r = this.ring;
            for (let s = 0; s < n; s++) {
              const s = e++ % n;
              t.next(r[s]);
            }
          }
          t.complete();
        }
      }
      function Yl(t = ec) {
        return (e) => e.lift(new Xl(t));
      }
      class Xl {
        constructor(t) {
          this.errorFactory = t;
        }
        call(t, e) {
          return e.subscribe(new tc(t, this.errorFactory));
        }
      }
      class tc extends f {
        constructor(t, e) {
          super(t), (this.errorFactory = e), (this.hasValue = !1);
        }
        _next(t) {
          (this.hasValue = !0), this.destination.next(t);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (t) {
              e = t;
            }
            this.destination.error(e);
          }
        }
      }
      function ec() {
        return new Fl();
      }
      function nc(t = null) {
        return (e) => e.lift(new rc(t));
      }
      class rc {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, e) {
          return e.subscribe(new sc(t, this.defaultValue));
        }
      }
      class sc extends f {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0);
        }
        _next(t) {
          (this.isEmpty = !1), this.destination.next(t);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function oc(t) {
        return function (e) {
          const n = new ic(t),
            r = e.lift(n);
          return (n.caught = r);
        };
      }
      class ic {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new ac(t, this.selector, this.caught));
        }
      }
      class ac extends N {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const r = new T(this, void 0, void 0);
            this.add(r);
            const s = j(this, n, void 0, void 0, r);
            s !== r && this.add(s);
          }
        }
      }
      function lc(t) {
        return (e) => (0 === t ? Bl() : e.lift(new cc(t)));
      }
      class cc {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Zl();
        }
        call(t, e) {
          return e.subscribe(new uc(t, this.total));
        }
      }
      class uc extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function hc(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? el((e, n) => t(e, n, r)) : y,
            lc(1),
            n ? nc(e) : Yl(() => new Fl())
          );
      }
      function dc() {}
      function pc(t, e, n) {
        return function (r) {
          return r.lift(new fc(t, e, n));
        };
      }
      class fc {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(
            new gc(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class gc extends f {
        constructor(t, e, n, s) {
          super(t),
            (this._tapNext = dc),
            (this._tapError = dc),
            (this._tapComplete = dc),
            (this._tapError = n || dc),
            (this._tapComplete = s || dc),
            r(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || dc),
                (this._tapError = e.error || dc),
                (this._tapComplete = e.complete || dc));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      class mc {
        constructor(t, e, n) {
          (this.predicate = t), (this.thisArg = e), (this.source = n);
        }
        call(t, e) {
          return e.subscribe(
            new yc(t, this.predicate, this.thisArg, this.source)
          );
        }
      }
      class yc extends f {
        constructor(t, e, n, r) {
          super(t),
            (this.predicate = e),
            (this.thisArg = n),
            (this.source = r),
            (this.index = 0),
            (this.thisArg = n || this);
        }
        notifyComplete(t) {
          this.destination.next(t), this.destination.complete();
        }
        _next(t) {
          let e = !1;
          try {
            e = this.predicate.call(this.thisArg, t, this.index++, this.source);
          } catch (n) {
            return void this.destination.error(n);
          }
          e || this.notifyComplete(!1);
        }
        _complete() {
          this.notifyComplete(!0);
        }
      }
      function vc(t, e) {
        return "function" == typeof e
          ? (n) =>
              n.pipe(vc((n, r) => L(t(n, r)).pipe(U((t, s) => e(n, t, r, s)))))
          : (e) => e.lift(new wc(t));
      }
      class wc {
        constructor(t) {
          this.project = t;
        }
        call(t, e) {
          return e.subscribe(new _c(t, this.project));
        }
      }
      class _c extends N {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0);
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const r = this.innerSubscription;
          r && r.unsubscribe();
          const s = new T(this, e, n),
            o = this.destination;
          o.add(s),
            (this.innerSubscription = j(this, t, void 0, void 0, s)),
            this.innerSubscription !== s && o.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: t } = this;
          (t && !t.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = null;
        }
        notifyComplete(t) {
          this.destination.remove(t),
            (this.innerSubscription = null),
            this.isStopped && super._complete();
        }
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
      }
      function bc(...t) {
        return Wl()(Xa(...t));
      }
      class xc {
        constructor(t, e, n = !1) {
          (this.accumulator = t), (this.seed = e), (this.hasSeed = n);
        }
        call(t, e) {
          return e.subscribe(
            new Sc(t, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class Sc extends f {
        constructor(t, e, n, r) {
          super(t),
            (this.accumulator = e),
            (this._seed = n),
            (this.hasSeed = r),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(t) {
          (this.hasSeed = !0), (this._seed = t);
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t);
          (this.seed = t), this.destination.next(t);
        }
        _tryNext(t) {
          const e = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, t, e);
          } catch (r) {
            this.destination.error(r);
          }
          (this.seed = n), this.destination.next(n);
        }
      }
      class Cc {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new Ec(t, this.callback));
        }
      }
      class Ec extends f {
        constructor(t, e) {
          super(t), this.add(new h(e));
        }
      }
      class Tc {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class kc extends Tc {
        constructor(t, e, n = "imperative", r = null) {
          super(t, e), (this.navigationTrigger = n), (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Ac extends Tc {
        constructor(t, e, n) {
          super(t, e), (this.urlAfterRedirects = n);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Rc extends Tc {
        constructor(t, e, n) {
          super(t, e), (this.reason = n);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Ic extends Tc {
        constructor(t, e, n) {
          super(t, e), (this.error = n);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class Oc extends Tc {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Pc extends Tc {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class jc extends Tc {
        constructor(t, e, n, r, s) {
          super(t, e),
            (this.urlAfterRedirects = n),
            (this.state = r),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class Nc extends Tc {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Uc extends Tc {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Dc {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class Hc {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class Mc {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Lc {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Fc {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class zc {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class $c {
        constructor(t, e, n) {
          (this.routerEvent = t), (this.position = e), (this.anchor = n);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class Vc {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function qc(t) {
        return new Vc(t);
      }
      function Bc(t) {
        const e = Error("NavigationCancelingError: " + t);
        return (e.ngNavigationCancelingError = !0), e;
      }
      function Gc(t, e, n) {
        const r = n.path.split("/");
        if (r.length > t.length) return null;
        if ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
          return null;
        const s = {};
        for (let o = 0; o < r.length; o++) {
          const e = r[o],
            n = t[o];
          if (e.startsWith(":")) s[e.substring(1)] = n;
          else if (e !== n.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: s };
      }
      function Wc(t, e) {
        const n = Object.keys(t),
          r = Object.keys(e);
        if (!n || !r || n.length != r.length) return !1;
        let s;
        for (let o = 0; o < n.length; o++)
          if (((s = n[o]), !Zc(t[s], e[s]))) return !1;
        return !0;
      }
      function Zc(t, e) {
        return Array.isArray(t) && Array.isArray(e)
          ? t.length == e.length && t.every((t) => e.indexOf(t) > -1)
          : t === e;
      }
      function Qc(t) {
        return Array.prototype.concat.apply([], t);
      }
      function Kc(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function Jc(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function Yc(t) {
        return (e = t) && "function" == typeof e.subscribe
          ? t
          : no(t)
          ? L(Promise.resolve(t))
          : Xa(t);
        var e;
      }
      function Xc(t, e, n) {
        return n
          ? (function (t, e) {
              return Wc(t, e);
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                if (!ru(e.segments, n.segments)) return !1;
                if (e.numberOfChildren !== n.numberOfChildren) return !1;
                for (const r in n.children) {
                  if (!e.children[r]) return !1;
                  if (!t(e.children[r], n.children[r])) return !1;
                }
                return !0;
              })(t.root, e.root)
          : (function (t, e) {
              return (
                Object.keys(e).length <= Object.keys(t).length &&
                Object.keys(e).every((n) => Zc(t[n], e[n]))
              );
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                return (function e(n, r, s) {
                  if (n.segments.length > s.length)
                    return (
                      !!ru(n.segments.slice(0, s.length), s) && !r.hasChildren()
                    );
                  if (n.segments.length === s.length) {
                    if (!ru(n.segments, s)) return !1;
                    for (const e in r.children) {
                      if (!n.children[e]) return !1;
                      if (!t(n.children[e], r.children[e])) return !1;
                    }
                    return !0;
                  }
                  {
                    const t = s.slice(0, n.segments.length),
                      o = s.slice(n.segments.length);
                    return (
                      !!ru(n.segments, t) &&
                      !!n.children.primary &&
                      e(n.children.primary, r, o)
                    );
                  }
                })(e, n, n.segments);
              })(t.root, e.root);
      }
      class tu {
        constructor(t, e, n) {
          (this.root = t), (this.queryParams = e), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = qc(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return au.serialize(this);
        }
      }
      class eu {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            Jc(e, (t, e) => (t.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return lu(this);
        }
      }
      class nu {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = qc(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return fu(this);
        }
      }
      function ru(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path);
      }
      function su(t, e) {
        let n = [];
        return (
          Jc(t.children, (t, r) => {
            "primary" === r && (n = n.concat(e(t, r)));
          }),
          Jc(t.children, (t, r) => {
            "primary" !== r && (n = n.concat(e(t, r)));
          }),
          n
        );
      }
      class ou {}
      class iu {
        parse(t) {
          const e = new wu(t);
          return new tu(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          return `${
            "/" +
            (function t(e, n) {
              if (!e.hasChildren()) return lu(e);
              if (n) {
                const n = e.children.primary ? t(e.children.primary, !1) : "",
                  r = [];
                return (
                  Jc(e.children, (e, n) => {
                    "primary" !== n && r.push(`${n}:${t(e, !1)}`);
                  }),
                  r.length > 0 ? `${n}(${r.join("//")})` : n
                );
              }
              {
                const n = su(e, (n, r) =>
                  "primary" === r
                    ? [t(e.children.primary, !1)]
                    : [`${r}:${t(n, !1)}`]
                );
                return `${lu(e)}/(${n.join("//")})`;
              }
            })(t.root, !0)
          }${(function (t) {
            const e = Object.keys(t).map((e) => {
              const n = t[e];
              return Array.isArray(n)
                ? n.map((t) => `${uu(e)}=${uu(t)}`).join("&")
                : `${uu(e)}=${uu(n)}`;
            });
            return e.length ? "?" + e.join("&") : "";
          })(t.queryParams)}${
            "string" == typeof t.fragment ? "#" + encodeURI(t.fragment) : ""
          }`;
        }
      }
      const au = new iu();
      function lu(t) {
        return t.segments.map((t) => fu(t)).join("/");
      }
      function cu(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function uu(t) {
        return cu(t).replace(/%3B/gi, ";");
      }
      function hu(t) {
        return cu(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function du(t) {
        return decodeURIComponent(t);
      }
      function pu(t) {
        return du(t.replace(/\+/g, "%20"));
      }
      function fu(t) {
        return `${hu(t.path)}${
          ((e = t.parameters),
          Object.keys(e)
            .map((t) => `;${hu(t)}=${hu(e[t])}`)
            .join(""))
        }`;
        var e;
      }
      const gu = /^[^\/()?;=#]+/;
      function mu(t) {
        const e = t.match(gu);
        return e ? e[0] : "";
      }
      const yu = /^[^=?&#]+/,
        vu = /^[^?&#]+/;
      class wu {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new eu([], {})
              : new eu([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (n.primary = new eu(t, e)),
            n
          );
        }
        parseSegment() {
          const t = mu(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new nu(du(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = mu(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = mu(this.remaining);
            t && ((n = t), this.capture(n));
          }
          t[du(e)] = du(n);
        }
        parseQueryParam(t) {
          const e = (function (t) {
            const e = t.match(yu);
            return e ? e[0] : "";
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = (function (t) {
              const e = t.match(vu);
              return e ? e[0] : "";
            })(this.remaining);
            t && ((n = t), this.capture(n));
          }
          const r = pu(e),
            s = pu(n);
          if (t.hasOwnProperty(r)) {
            let e = t[r];
            Array.isArray(e) || ((e = [e]), (t[r] = e)), e.push(s);
          } else t[r] = s;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = mu(this.remaining),
              r = this.remaining[n.length];
            if ("/" !== r && ")" !== r && ";" !== r)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s = void 0;
            n.indexOf(":") > -1
              ? ((s = n.substr(0, n.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : t && (s = "primary");
            const o = this.parseChildren();
            (e[s] = 1 === Object.keys(o).length ? o.primary : new eu([], o)),
              this.consumeOptional("//");
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class _u {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = bu(t, this._root);
          return e ? e.children.map((t) => t.value) : [];
        }
        firstChild(t) {
          const e = bu(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = xu(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((t) => t.value)
                .filter((e) => e !== t);
        }
        pathFromRoot(t) {
          return xu(t, this._root).map((t) => t.value);
        }
      }
      function bu(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const e = bu(t, n);
          if (e) return e;
        }
        return null;
      }
      function xu(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const r = xu(t, n);
          if (r.length) return r.unshift(e), r;
        }
        return [];
      }
      class Su {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Cu(t) {
        const e = {};
        return t && t.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class Eu extends _u {
        constructor(t, e) {
          super(t), (this.snapshot = e), Ou(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Tu(t, e) {
        const n = (function (t, e) {
            const n = new Ru(
              [],
              {},
              {},
              "",
              {},
              "primary",
              e,
              null,
              t.root,
              -1,
              {}
            );
            return new Iu("", new Su(n, []));
          })(t, e),
          r = new Ll([new nu("", {})]),
          s = new Ll({}),
          o = new Ll({}),
          i = new Ll({}),
          a = new Ll(""),
          l = new ku(r, s, i, a, o, "primary", e, n.root);
        return (l.snapshot = n.root), new Eu(new Su(l, []), n);
      }
      class ku {
        constructor(t, e, n, r, s, o, i, a) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = o),
            (this.component = i),
            (this._futureSnapshot = a);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(U((t) => qc(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(U((t) => qc(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Au(t, e = "emptyOnly") {
        const n = t.pathFromRoot;
        let r = 0;
        if ("always" !== e)
          for (r = n.length - 1; r >= 1; ) {
            const t = n[r],
              e = n[r - 1];
            if (t.routeConfig && "" === t.routeConfig.path) r--;
            else {
              if (e.component) break;
              r--;
            }
          }
        return (function (t) {
          return t.reduce(
            (t, e) => ({
              params: Object.assign(Object.assign({}, t.params), e.params),
              data: Object.assign(Object.assign({}, t.data), e.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                e._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Ru {
        constructor(t, e, n, r, s, o, i, a, l, c, u) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = o),
            (this.component = i),
            (this.routeConfig = a),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = u);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = qc(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = qc(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((t) => t.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Iu extends _u {
        constructor(t, e) {
          super(e), (this.url = t), Ou(this, e);
        }
        toString() {
          return Pu(this._root);
        }
      }
      function Ou(t, e) {
        (e.value._routerState = t), e.children.forEach((e) => Ou(t, e));
      }
      function Pu(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(Pu).join(", ")} } ` : "";
        return `${t.value}${e}`;
      }
      function ju(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            Wc(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            Wc(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!Wc(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            Wc(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function Nu(t, e) {
        var n, r;
        return (
          Wc(t.params, e.params) &&
          ru((n = t.url), (r = e.url)) &&
          n.every((t, e) => Wc(t.parameters, r[e].parameters)) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || Nu(t.parent, e.parent))
        );
      }
      function Uu(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function Du(t, e, n, r, s) {
        let o = {};
        return (
          r &&
            Jc(r, (t, e) => {
              o[e] = Array.isArray(t) ? t.map((t) => "" + t) : "" + t;
            }),
          new tu(
            n.root === t
              ? e
              : (function t(e, n, r) {
                  const s = {};
                  return (
                    Jc(e.children, (e, o) => {
                      s[o] = e === n ? r : t(e, n, r);
                    }),
                    new eu(e.segments, s)
                  );
                })(n.root, t, e),
            o,
            s
          )
        );
      }
      class Hu {
        constructor(t, e, n) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = n),
            t && n.length > 0 && Uu(n[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const r = n.find(
            (t) => "object" == typeof t && null != t && t.outlets
          );
          if (r && r !== Kc(n))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Mu {
        constructor(t, e, n) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = n);
        }
      }
      function Lu(t) {
        return "object" == typeof t && null != t && t.outlets
          ? t.outlets.primary
          : "" + t;
      }
      function Fu(t, e, n) {
        if (
          (t || (t = new eu([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return zu(t, e, n);
        const r = (function (t, e, n) {
            let r = 0,
              s = e;
            const o = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; s < t.segments.length; ) {
              if (r >= n.length) return o;
              const e = t.segments[s],
                i = Lu(n[r]),
                a = r < n.length - 1 ? n[r + 1] : null;
              if (s > 0 && void 0 === i) break;
              if (i && a && "object" == typeof a && void 0 === a.outlets) {
                if (!Bu(i, a, e)) return o;
                r += 2;
              } else {
                if (!Bu(i, {}, e)) return o;
                r++;
              }
              s++;
            }
            return { match: !0, pathIndex: s, commandIndex: r };
          })(t, e, n),
          s = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          const e = new eu(t.segments.slice(0, r.pathIndex), {});
          return (
            (e.children.primary = new eu(
              t.segments.slice(r.pathIndex),
              t.children
            )),
            zu(e, 0, s)
          );
        }
        return r.match && 0 === s.length
          ? new eu(t.segments, {})
          : r.match && !t.hasChildren()
          ? $u(t, e, n)
          : r.match
          ? zu(t, 0, s)
          : $u(t, e, n);
      }
      function zu(t, e, n) {
        if (0 === n.length) return new eu(t.segments, {});
        {
          const r = (function (t) {
              return "object" == typeof t[0] && null !== t[0] && t[0].outlets
                ? t[0].outlets
                : { primary: t };
            })(n),
            s = {};
          return (
            Jc(r, (n, r) => {
              null !== n && (s[r] = Fu(t.children[r], e, n));
            }),
            Jc(t.children, (t, e) => {
              void 0 === r[e] && (s[e] = t);
            }),
            new eu(t.segments, s)
          );
        }
      }
      function $u(t, e, n) {
        const r = t.segments.slice(0, e);
        let s = 0;
        for (; s < n.length; ) {
          if (
            "object" == typeof n[s] &&
            null !== n[s] &&
            void 0 !== n[s].outlets
          ) {
            const t = Vu(n[s].outlets);
            return new eu(r, t);
          }
          if (0 === s && Uu(n[0])) {
            r.push(new nu(t.segments[e].path, n[0])), s++;
            continue;
          }
          const o = Lu(n[s]),
            i = s < n.length - 1 ? n[s + 1] : null;
          o && i && Uu(i)
            ? (r.push(new nu(o, qu(i))), (s += 2))
            : (r.push(new nu(o, {})), s++);
        }
        return new eu(r, {});
      }
      function Vu(t) {
        const e = {};
        return (
          Jc(t, (t, n) => {
            null !== t && (e[n] = $u(new eu([], {}), 0, t));
          }),
          e
        );
      }
      function qu(t) {
        const e = {};
        return Jc(t, (t, n) => (e[n] = "" + t)), e;
      }
      function Bu(t, e, n) {
        return t == n.path && Wc(e, n.parameters);
      }
      class Gu {
        constructor(t, e, n, r) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = n),
            (this.forwardEvent = r);
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, n, t),
            ju(this.futureState.root),
            this.activateChildRoutes(e, n, t);
        }
        deactivateChildRoutes(t, e, n) {
          const r = Cu(e);
          t.children.forEach((t) => {
            const e = t.value.outlet;
            this.deactivateRoutes(t, r[e], n), delete r[e];
          }),
            Jc(r, (t, e) => {
              this.deactivateRouteAndItsChildren(t, n);
            });
        }
        deactivateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if (r === s)
            if (r.component) {
              const s = n.getContext(r.outlet);
              s && this.deactivateChildRoutes(t, e, s.children);
            } else this.deactivateChildRoutes(t, e, n);
          else s && this.deactivateRouteAndItsChildren(e, n);
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              r = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: e,
              route: t,
              contexts: r,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n) {
            const r = Cu(t),
              s = t.value.component ? n.children : e;
            Jc(r, (t, e) => this.deactivateRouteAndItsChildren(t, s)),
              n.outlet &&
                (n.outlet.deactivate(), n.children.onOutletDeactivated());
          }
        }
        activateChildRoutes(t, e, n) {
          const r = Cu(e);
          t.children.forEach((t) => {
            this.activateRoutes(t, r[t.value.outlet], n),
              this.forwardEvent(new zc(t.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new Lc(t.value.snapshot));
        }
        activateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if ((ju(r), r === s))
            if (r.component) {
              const s = n.getOrCreateContext(r.outlet);
              this.activateChildRoutes(t, e, s.children);
            } else this.activateChildRoutes(t, e, n);
          else if (r.component) {
            const e = n.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                e.children.onOutletReAttached(t.contexts),
                (e.attachRef = t.componentRef),
                (e.route = t.route.value),
                e.outlet && e.outlet.attach(t.componentRef, t.route.value),
                Wu(t.route);
            } else {
              const n = (function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null;
                  }
                  return null;
                })(r.snapshot),
                s = n ? n.module.componentFactoryResolver : null;
              (e.attachRef = null),
                (e.route = r),
                (e.resolver = s),
                e.outlet && e.outlet.activateWith(r, s),
                this.activateChildRoutes(t, null, e.children);
            }
          } else this.activateChildRoutes(t, null, n);
        }
      }
      function Wu(t) {
        ju(t.value), t.children.forEach(Wu);
      }
      class Zu {
        constructor(t, e) {
          (this.routes = t), (this.module = e);
        }
      }
      function Qu(t) {
        return "function" == typeof t;
      }
      function Ku(t) {
        return t instanceof tu;
      }
      class Ju {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Yu {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Xu(t) {
        return new v((e) => e.error(new Ju(t)));
      }
      function th(t) {
        return new v((e) => e.error(new Yu(t)));
      }
      function eh(t) {
        return new v((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`
            )
          )
        );
      }
      class nh {
        constructor(t, e, n, r, s) {
          (this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(Wt));
        }
        apply() {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            this.urlTree.root,
            "primary"
          )
            .pipe(
              U((t) =>
                this.createUrlTree(
                  t,
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              oc((t) => {
                if (t instanceof Yu)
                  return (this.allowRedirects = !1), this.match(t.urlTree);
                if (t instanceof Ju) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            t.root,
            "primary"
          )
            .pipe(U((e) => this.createUrlTree(e, t.queryParams, t.fragment)))
            .pipe(
              oc((t) => {
                if (t instanceof Ju) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, e, n) {
          const r = t.segments.length > 0 ? new eu([], { primary: t }) : t;
          return new tu(r, e, n);
        }
        expandSegmentGroup(t, e, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(t, e, n).pipe(U((t) => new eu([], t)))
            : this.expandSegment(t, n, e, n.segments, r, !0);
        }
        expandChildren(t, e, n) {
          return (function (t, e) {
            if (0 === Object.keys(t).length) return Xa({});
            const n = [],
              r = [],
              s = {};
            return (
              Jc(t, (t, o) => {
                const i = e(o, t).pipe(U((t) => (s[o] = t)));
                "primary" === o ? n.push(i) : r.push(i);
              }),
              Xa.apply(null, n.concat(r)).pipe(
                Wl(),
                (function (t, e) {
                  const n = arguments.length >= 2;
                  return (r) =>
                    r.pipe(
                      t ? el((e, n) => t(e, n, r)) : y,
                      Ql(1),
                      n ? nc(e) : Yl(() => new Fl())
                    );
                })(),
                U(() => s)
              )
            );
          })(n.children, (n, r) => this.expandSegmentGroup(t, e, r, n));
        }
        expandSegment(t, e, n, r, s, o) {
          return Xa(...n).pipe(
            U((i) =>
              this.expandSegmentAgainstRoute(t, e, n, i, r, s, o).pipe(
                oc((t) => {
                  if (t instanceof Ju) return Xa(null);
                  throw t;
                })
              )
            ),
            Wl(),
            hc((t) => !!t),
            oc((t, n) => {
              if (t instanceof Fl || "EmptyError" === t.name) {
                if (this.noLeftoversInUrl(e, r, s)) return Xa(new eu([], {}));
                throw new Ju(e);
              }
              throw t;
            })
          );
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        expandSegmentAgainstRoute(t, e, n, r, s, o, i) {
          return ih(r) !== o
            ? Xu(e)
            : void 0 === r.redirectTo
            ? this.matchSegmentAgainstRoute(t, e, r, s)
            : i && this.allowRedirects
            ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, o)
            : Xu(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, o) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                n,
                r,
                s,
                o
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
          const s = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith("/")
            ? th(s)
            : this.lineralizeSegments(n, s).pipe(
                F((n) => {
                  const s = new eu(n, {});
                  return this.expandSegment(t, s, e, n, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, o) {
          const {
            matched: i,
            consumedSegments: a,
            lastChild: l,
            positionalParamSegments: c,
          } = rh(e, r, s);
          if (!i) return Xu(e);
          const u = this.applyRedirectCommands(a, r.redirectTo, c);
          return r.redirectTo.startsWith("/")
            ? th(u)
            : this.lineralizeSegments(r, u).pipe(
                F((r) =>
                  this.expandSegment(t, e, n, r.concat(s.slice(l)), o, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, e, n, r) {
          if ("**" === n.path)
            return n.loadChildren
              ? this.configLoader
                  .load(t.injector, n)
                  .pipe(U((t) => ((n._loadedConfig = t), new eu(r, {}))))
              : Xa(new eu(r, {}));
          const { matched: s, consumedSegments: o, lastChild: i } = rh(e, n, r);
          if (!s) return Xu(e);
          const a = r.slice(i);
          return this.getChildConfig(t, n, r).pipe(
            F((t) => {
              const n = t.module,
                r = t.routes,
                { segmentGroup: s, slicedSegments: i } = (function (
                  t,
                  e,
                  n,
                  r
                ) {
                  return n.length > 0 &&
                    (function (t, e, n) {
                      return n.some((n) => oh(t, e, n) && "primary" !== ih(n));
                    })(t, n, r)
                    ? {
                        segmentGroup: sh(
                          new eu(
                            e,
                            (function (t, e) {
                              const n = {};
                              n.primary = e;
                              for (const r of t)
                                "" === r.path &&
                                  "primary" !== ih(r) &&
                                  (n[ih(r)] = new eu([], {}));
                              return n;
                            })(r, new eu(n, t.children))
                          )
                        ),
                        slicedSegments: [],
                      }
                    : 0 === n.length &&
                      (function (t, e, n) {
                        return n.some((n) => oh(t, e, n));
                      })(t, n, r)
                    ? {
                        segmentGroup: sh(
                          new eu(
                            t.segments,
                            (function (t, e, n, r) {
                              const s = {};
                              for (const o of n)
                                oh(t, e, o) &&
                                  !r[ih(o)] &&
                                  (s[ih(o)] = new eu([], {}));
                              return Object.assign(Object.assign({}, r), s);
                            })(t, n, r, t.children)
                          )
                        ),
                        slicedSegments: n,
                      }
                    : { segmentGroup: t, slicedSegments: n };
                })(e, o, a, r);
              return 0 === i.length && s.hasChildren()
                ? this.expandChildren(n, r, s).pipe(U((t) => new eu(o, t)))
                : 0 === r.length && 0 === i.length
                ? Xa(new eu(o, {}))
                : this.expandSegment(n, s, r, i, "primary", !0).pipe(
                    U((t) => new eu(o.concat(t.segments), t.children))
                  );
            })
          );
        }
        getChildConfig(t, e, n) {
          return e.children
            ? Xa(new Zu(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? Xa(e._loadedConfig)
              : this.runCanLoadGuards(t.injector, e, n).pipe(
                  F((n) =>
                    n
                      ? this.configLoader
                          .load(t.injector, e)
                          .pipe(U((t) => ((e._loadedConfig = t), t)))
                      : (function (t) {
                          return new v((e) =>
                            e.error(
                              Bc(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(e)
                  )
                )
            : Xa(new Zu([], t));
        }
        runCanLoadGuards(t, e, n) {
          const r = e.canLoad;
          return r && 0 !== r.length
            ? L(r)
                .pipe(
                  U((r) => {
                    const s = t.get(r);
                    let o;
                    if (
                      (function (t) {
                        return t && Qu(t.canLoad);
                      })(s)
                    )
                      o = s.canLoad(e, n);
                    else {
                      if (!Qu(s)) throw new Error("Invalid CanLoad guard");
                      o = s(e, n);
                    }
                    return Yc(o);
                  })
                )
                .pipe(
                  Wl(),
                  pc((t) => {
                    if (!Ku(t)) return;
                    const e = Bc(
                      `Redirecting to "${this.urlSerializer.serialize(t)}"`
                    );
                    throw ((e.url = t), e);
                  }),
                  ((s = (t) => !0 === t), (t) => t.lift(new mc(s, void 0, t)))
                )
            : Xa(!0);
          var s;
        }
        lineralizeSegments(t, e) {
          let n = [],
            r = e.root;
          for (;;) {
            if (((n = n.concat(r.segments)), 0 === r.numberOfChildren))
              return Xa(n);
            if (r.numberOfChildren > 1 || !r.children.primary)
              return eh(t.redirectTo);
            r = r.children.primary;
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            n
          );
        }
        applyRedirectCreatreUrlTree(t, e, n, r) {
          const s = this.createSegmentGroup(t, e.root, n, r);
          return new tu(
            s,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const n = {};
          return (
            Jc(t, (t, r) => {
              if ("string" == typeof t && t.startsWith(":")) {
                const s = t.substring(1);
                n[r] = e[s];
              } else n[r] = t;
            }),
            n
          );
        }
        createSegmentGroup(t, e, n, r) {
          const s = this.createSegments(t, e.segments, n, r);
          let o = {};
          return (
            Jc(e.children, (e, s) => {
              o[s] = this.createSegmentGroup(t, e, n, r);
            }),
            new eu(s, o)
          );
        }
        createSegments(t, e, n, r) {
          return e.map((e) =>
            e.path.startsWith(":")
              ? this.findPosParam(t, e, r)
              : this.findOrReturn(e, n)
          );
        }
        findPosParam(t, e, n) {
          const r = n[e.path.substring(1)];
          if (!r)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${e.path}'.`
            );
          return r;
        }
        findOrReturn(t, e) {
          let n = 0;
          for (const r of e) {
            if (r.path === t.path) return e.splice(n), r;
            n++;
          }
          return t;
        }
      }
      function rh(t, e, n) {
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? {
                matched: !1,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              }
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              };
        const r = (e.matcher || Gc)(n, t, e);
        return r
          ? {
              matched: !0,
              consumedSegments: r.consumed,
              lastChild: r.consumed.length,
              positionalParamSegments: r.posParams,
            }
          : {
              matched: !1,
              consumedSegments: [],
              lastChild: 0,
              positionalParamSegments: {},
            };
      }
      function sh(t) {
        if (1 === t.numberOfChildren && t.children.primary) {
          const e = t.children.primary;
          return new eu(t.segments.concat(e.segments), e.children);
        }
        return t;
      }
      function oh(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 !== n.redirectTo
        );
      }
      function ih(t) {
        return t.outlet || "primary";
      }
      class ah {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class lh {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function ch(t, e, n) {
        const r = t._root;
        return (function t(
          e,
          n,
          r,
          s,
          o = { canDeactivateChecks: [], canActivateChecks: [] }
        ) {
          const i = Cu(n);
          return (
            e.children.forEach((e) => {
              !(function (
                e,
                n,
                r,
                s,
                o = { canDeactivateChecks: [], canActivateChecks: [] }
              ) {
                const i = e.value,
                  a = n ? n.value : null,
                  l = r ? r.getContext(e.value.outlet) : null;
                if (a && i.routeConfig === a.routeConfig) {
                  const c = (function (t, e, n) {
                    if ("function" == typeof n) return n(t, e);
                    switch (n) {
                      case "pathParamsChange":
                        return !ru(t.url, e.url);
                      case "pathParamsOrQueryParamsChange":
                        return (
                          !ru(t.url, e.url) || !Wc(t.queryParams, e.queryParams)
                        );
                      case "always":
                        return !0;
                      case "paramsOrQueryParamsChange":
                        return !Nu(t, e) || !Wc(t.queryParams, e.queryParams);
                      case "paramsChange":
                      default:
                        return !Nu(t, e);
                    }
                  })(a, i, i.routeConfig.runGuardsAndResolvers);
                  c
                    ? o.canActivateChecks.push(new ah(s))
                    : ((i.data = a.data), (i._resolvedData = a._resolvedData)),
                    t(e, n, i.component ? (l ? l.children : null) : r, s, o),
                    c &&
                      o.canDeactivateChecks.push(
                        new lh((l && l.outlet && l.outlet.component) || null, a)
                      );
                } else
                  a && hh(n, l, o),
                    o.canActivateChecks.push(new ah(s)),
                    t(e, null, i.component ? (l ? l.children : null) : r, s, o);
              })(e, i[e.value.outlet], r, s.concat([e.value]), o),
                delete i[e.value.outlet];
            }),
            Jc(i, (t, e) => hh(t, r.getContext(e), o)),
            o
          );
        })(r, e ? e._root : null, n, [r.value]);
      }
      function uh(t, e, n) {
        const r = (function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : n).get(t);
      }
      function hh(t, e, n) {
        const r = Cu(t),
          s = t.value;
        Jc(r, (t, r) => {
          hh(t, s.component ? (e ? e.children.getContext(r) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new lh(
              s.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              s
            )
          );
      }
      const dh = Symbol("INITIAL_VALUE");
      function ph() {
        return vc((t) =>
          (function (...t) {
            let e = null,
              n = null;
            return (
              E(t[t.length - 1]) && (n = t.pop()),
              "function" == typeof t[t.length - 1] && (e = t.pop()),
              1 === t.length && l(t[0]) && (t = t[0]),
              q(t, n).lift(new $l(e))
            );
          })(
            ...t.map((t) =>
              t.pipe(
                lc(1),
                (function (...t) {
                  const e = t[t.length - 1];
                  return E(e) ? (t.pop(), (n) => bc(t, n, e)) : (e) => bc(t, e);
                })(dh)
              )
            )
          ).pipe(
            (function (t, e) {
              let n = !1;
              return (
                arguments.length >= 2 && (n = !0),
                function (r) {
                  return r.lift(new xc(t, e, n));
                }
              );
            })((t, e) => {
              let n = !1;
              return e.reduce((t, r, s) => {
                if (t !== dh) return t;
                if ((r === dh && (n = !0), !n)) {
                  if (!1 === r) return r;
                  if (s === e.length - 1 || Ku(r)) return r;
                }
                return t;
              }, t);
            }, dh),
            el((t) => t !== dh),
            U((t) => (Ku(t) ? t : !0 === t)),
            lc(1)
          )
        );
      }
      function fh(t, e) {
        return null !== t && e && e(new Fc(t)), Xa(!0);
      }
      function gh(t, e) {
        return null !== t && e && e(new Mc(t)), Xa(!0);
      }
      function mh(t, e, n) {
        const r = e.routeConfig ? e.routeConfig.canActivate : null;
        return r && 0 !== r.length
          ? Xa(
              r.map((r) =>
                Gl(() => {
                  const s = uh(r, e, n);
                  let o;
                  if (
                    (function (t) {
                      return t && Qu(t.canActivate);
                    })(s)
                  )
                    o = Yc(s.canActivate(e, t));
                  else {
                    if (!Qu(s)) throw new Error("Invalid CanActivate guard");
                    o = Yc(s(e, t));
                  }
                  return o.pipe(hc());
                })
              )
            ).pipe(ph())
          : Xa(!0);
      }
      function yh(t, e, n) {
        const r = e[e.length - 1],
          s = e
            .slice(0, e.length - 1)
            .reverse()
            .map((t) =>
              (function (t) {
                const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                return e && 0 !== e.length ? { node: t, guards: e } : null;
              })(t)
            )
            .filter((t) => null !== t)
            .map((e) =>
              Gl(() =>
                Xa(
                  e.guards.map((s) => {
                    const o = uh(s, e.node, n);
                    let i;
                    if (
                      (function (t) {
                        return t && Qu(t.canActivateChild);
                      })(o)
                    )
                      i = Yc(o.canActivateChild(r, t));
                    else {
                      if (!Qu(o))
                        throw new Error("Invalid CanActivateChild guard");
                      i = Yc(o(r, t));
                    }
                    return i.pipe(hc());
                  })
                ).pipe(ph())
              )
            );
        return Xa(s).pipe(ph());
      }
      class vh {}
      class wh {
        constructor(t, e, n, r, s, o) {
          (this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = n),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = o);
        }
        recognize() {
          try {
            const t = xh(
                this.urlTree.root,
                [],
                [],
                this.config,
                this.relativeLinkResolution
              ).segmentGroup,
              e = this.processSegmentGroup(this.config, t, "primary"),
              n = new Ru(
                [],
                Object.freeze({}),
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                {},
                "primary",
                this.rootComponentType,
                null,
                this.urlTree.root,
                -1,
                {}
              ),
              r = new Su(n, e),
              s = new Iu(this.url, r);
            return this.inheritParamsAndData(s._root), Xa(s);
          } catch (t) {
            return new v((e) => e.error(t));
          }
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = Au(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(n.params)),
            (e.data = Object.freeze(n.data)),
            t.children.forEach((t) => this.inheritParamsAndData(t));
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, n);
        }
        processChildren(t, e) {
          const n = su(e, (e, n) => this.processSegmentGroup(t, e, n));
          return (
            (function (t) {
              const e = {};
              t.forEach((t) => {
                const n = e[t.value.outlet];
                if (n) {
                  const e = n.url.map((t) => t.toString()).join("/"),
                    r = t.value.url.map((t) => t.toString()).join("/");
                  throw new Error(
                    `Two segments cannot have the same outlet name: '${e}' and '${r}'.`
                  );
                }
                e[t.value.outlet] = t.value;
              });
            })(n),
            n.sort((t, e) =>
              "primary" === t.value.outlet
                ? -1
                : "primary" === e.value.outlet
                ? 1
                : t.value.outlet.localeCompare(e.value.outlet)
            ),
            n
          );
        }
        processSegment(t, e, n, r) {
          for (const o of t)
            try {
              return this.processSegmentAgainstRoute(o, e, n, r);
            } catch (s) {
              if (!(s instanceof vh)) throw s;
            }
          if (this.noLeftoversInUrl(e, n, r)) return [];
          throw new vh();
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        processSegmentAgainstRoute(t, e, n, r) {
          if (t.redirectTo) throw new vh();
          if ((t.outlet || "primary") !== r) throw new vh();
          let s,
            o = [],
            i = [];
          if ("**" === t.path) {
            const o = n.length > 0 ? Kc(n).parameters : {};
            s = new Ru(
              n,
              o,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              Eh(t),
              r,
              t.component,
              t,
              _h(e),
              bh(e) + n.length,
              Th(t)
            );
          } else {
            const a = (function (t, e, n) {
              if ("" === e.path) {
                if ("full" === e.pathMatch && (t.hasChildren() || n.length > 0))
                  throw new vh();
                return { consumedSegments: [], lastChild: 0, parameters: {} };
              }
              const r = (e.matcher || Gc)(n, t, e);
              if (!r) throw new vh();
              const s = {};
              Jc(r.posParams, (t, e) => {
                s[e] = t.path;
              });
              const o =
                r.consumed.length > 0
                  ? Object.assign(
                      Object.assign({}, s),
                      r.consumed[r.consumed.length - 1].parameters
                    )
                  : s;
              return {
                consumedSegments: r.consumed,
                lastChild: r.consumed.length,
                parameters: o,
              };
            })(e, t, n);
            (o = a.consumedSegments),
              (i = n.slice(a.lastChild)),
              (s = new Ru(
                o,
                a.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                Eh(t),
                r,
                t.component,
                t,
                _h(e),
                bh(e) + o.length,
                Th(t)
              ));
          }
          const a = (function (t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: l, slicedSegments: c } = xh(
              e,
              o,
              i,
              a,
              this.relativeLinkResolution
            );
          if (0 === c.length && l.hasChildren()) {
            const t = this.processChildren(a, l);
            return [new Su(s, t)];
          }
          if (0 === a.length && 0 === c.length) return [new Su(s, [])];
          const u = this.processSegment(a, l, c, "primary");
          return [new Su(s, u)];
        }
      }
      function _h(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function bh(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return n - 1;
      }
      function xh(t, e, n, r, s) {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some((n) => Sh(t, e, n) && "primary" !== Ch(n));
          })(t, n, r)
        ) {
          const s = new eu(
            e,
            (function (t, e, n, r) {
              const s = {};
              (s.primary = r),
                (r._sourceSegment = t),
                (r._segmentIndexShift = e.length);
              for (const o of n)
                if ("" === o.path && "primary" !== Ch(o)) {
                  const n = new eu([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift = e.length),
                    (s[Ch(o)] = n);
                }
              return s;
            })(t, e, r, new eu(n, t.children))
          );
          return (
            (s._sourceSegment = t),
            (s._segmentIndexShift = e.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some((n) => Sh(t, e, n));
          })(t, n, r)
        ) {
          const o = new eu(
            t.segments,
            (function (t, e, n, r, s, o) {
              const i = {};
              for (const a of r)
                if (Sh(t, n, a) && !s[Ch(a)]) {
                  const n = new eu([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift =
                      "legacy" === o ? t.segments.length : e.length),
                    (i[Ch(a)] = n);
                }
              return Object.assign(Object.assign({}, s), i);
            })(t, e, n, r, t.children, s)
          );
          return (
            (o._sourceSegment = t),
            (o._segmentIndexShift = e.length),
            { segmentGroup: o, slicedSegments: n }
          );
        }
        const o = new eu(t.segments, t.children);
        return (
          (o._sourceSegment = t),
          (o._segmentIndexShift = e.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function Sh(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 === n.redirectTo
        );
      }
      function Ch(t) {
        return t.outlet || "primary";
      }
      function Eh(t) {
        return t.data || {};
      }
      function Th(t) {
        return t.resolve || {};
      }
      function kh(t) {
        return function (e) {
          return e.pipe(
            vc((e) => {
              const n = t(e);
              return n ? L(n).pipe(U(() => e)) : L([e]);
            })
          );
        };
      }
      class Ah {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      }
      let Rh = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = re({
            type: t,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (t, e) {
              1 & t && eo(0, "router-outlet");
            },
            directives: function () {
              return [Bh];
            },
            encapsulation: 2,
          })),
          t
        );
      })();
      function Ih(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          Oh(r, Ph(e, r));
        }
      }
      function Oh(t, e) {
        if (!t)
          throw new Error(
            `\n      Invalid configuration of route '${e}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `
          );
        if (Array.isArray(t))
          throw new Error(
            `Invalid configuration of route '${e}': Array cannot be specified`
          );
        if (
          !t.component &&
          !t.children &&
          !t.loadChildren &&
          t.outlet &&
          "primary" !== t.outlet
        )
          throw new Error(
            `Invalid configuration of route '${e}': a componentless route without children or loadChildren cannot have a named outlet set`
          );
        if (t.redirectTo && t.children)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and children cannot be used together`
          );
        if (t.redirectTo && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and loadChildren cannot be used together`
          );
        if (t.children && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': children and loadChildren cannot be used together`
          );
        if (t.redirectTo && t.component)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and component cannot be used together`
          );
        if (t.path && t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': path and matcher cannot be used together`
          );
        if (
          void 0 === t.redirectTo &&
          !t.component &&
          !t.children &&
          !t.loadChildren
        )
          throw new Error(
            `Invalid configuration of route '${e}'. One of the following must be provided: component, redirectTo, children or loadChildren`
          );
        if (void 0 === t.path && void 0 === t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': routes must have either a path or a matcher specified`
          );
        if ("string" == typeof t.path && "/" === t.path.charAt(0))
          throw new Error(
            `Invalid configuration of route '${e}': path cannot start with a slash`
          );
        if ("" === t.path && void 0 !== t.redirectTo && void 0 === t.pathMatch)
          throw new Error(
            `Invalid configuration of route '{path: "${e}", redirectTo: "${t.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`
          );
        if (
          void 0 !== t.pathMatch &&
          "full" !== t.pathMatch &&
          "prefix" !== t.pathMatch
        )
          throw new Error(
            `Invalid configuration of route '${e}': pathMatch can only be set to 'prefix' or 'full'`
          );
        t.children && Ih(t.children, e);
      }
      function Ph(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? t + "/"
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ""
          : t;
      }
      function jh(t) {
        const e = t.children && t.children.map(jh),
          n = e
            ? Object.assign(Object.assign({}, t), { children: e })
            : Object.assign({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            "primary" !== n.outlet &&
            (n.component = Rh),
          n
        );
      }
      const Nh = new jt("ROUTES");
      class Uh {
        constructor(t, e, n, r) {
          (this.loader = t),
            (this.compiler = e),
            (this.onLoadStartListener = n),
            (this.onLoadEndListener = r);
        }
        load(t, e) {
          return (
            this.onLoadStartListener && this.onLoadStartListener(e),
            this.loadModuleFactory(e.loadChildren).pipe(
              U((n) => {
                this.onLoadEndListener && this.onLoadEndListener(e);
                const r = n.create(t);
                return new Zu(Qc(r.injector.get(Nh)).map(jh), r);
              })
            )
          );
        }
        loadModuleFactory(t) {
          return "string" == typeof t
            ? L(this.loader.load(t))
            : Yc(t()).pipe(
                F((t) =>
                  t instanceof Zt
                    ? Xa(t)
                    : L(this.compiler.compileModuleAsync(t))
                )
              );
        }
      }
      class Dh {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new Hh()),
            (this.attachRef = null);
        }
      }
      class Hh {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t);
          (n.outlet = e), this.contexts.set(t, n);
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && (e.outlet = null);
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || ((e = new Dh()), this.contexts.set(t, e)), e;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      class Mh {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, e) {
          return t;
        }
      }
      function Lh(t) {
        throw t;
      }
      function Fh(t, e, n) {
        return e.parse("/");
      }
      function zh(t, e) {
        return Xa(null);
      }
      let $h = (() => {
          class t {
            constructor(t, e, n, r, s, o, i, a) {
              (this.rootComponentType = t),
                (this.urlSerializer = e),
                (this.rootContexts = n),
                (this.location = r),
                (this.config = a),
                (this.lastSuccessfulNavigation = null),
                (this.currentNavigation = null),
                (this.navigationId = 0),
                (this.isNgZoneEnabled = !1),
                (this.events = new S()),
                (this.errorHandler = Lh),
                (this.malformedUriErrorHandler = Fh),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.hooks = {
                  beforePreactivation: zh,
                  afterPreactivation: zh,
                }),
                (this.urlHandlingStrategy = new Mh()),
                (this.routeReuseStrategy = new Ah()),
                (this.onSameUrlNavigation = "ignore"),
                (this.paramsInheritanceStrategy = "emptyOnly"),
                (this.urlUpdateStrategy = "deferred"),
                (this.relativeLinkResolution = "legacy"),
                (this.ngModule = s.get(Wt)),
                (this.console = s.get(ci));
              const l = s.get(xi);
              (this.isNgZoneEnabled = l instanceof xi),
                this.resetConfig(a),
                (this.currentUrlTree = new tu(new eu([], {}), {}, null)),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.configLoader = new Uh(
                  o,
                  i,
                  (t) => this.triggerEvent(new Dc(t)),
                  (t) => this.triggerEvent(new Hc(t))
                )),
                (this.routerState = Tu(
                  this.currentUrlTree,
                  this.rootComponentType
                )),
                (this.transitions = new Ll({
                  id: 0,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  extractedUrl: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  urlAfterRedirects: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  rawUrl: this.currentUrlTree,
                  extras: {},
                  resolve: null,
                  reject: null,
                  promise: Promise.resolve(!0),
                  source: "imperative",
                  restoredState: null,
                  currentSnapshot: this.routerState.snapshot,
                  targetSnapshot: null,
                  currentRouterState: this.routerState,
                  targetRouterState: null,
                  guards: { canActivateChecks: [], canDeactivateChecks: [] },
                  guardsResult: null,
                })),
                (this.navigations = this.setupNavigations(this.transitions)),
                this.processNavigations();
            }
            setupNavigations(t) {
              const e = this.events;
              return t.pipe(
                el((t) => 0 !== t.id),
                U((t) =>
                  Object.assign(Object.assign({}, t), {
                    extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl),
                  })
                ),
                vc((t) => {
                  let n = !1,
                    r = !1;
                  return Xa(t).pipe(
                    pc((t) => {
                      this.currentNavigation = {
                        id: t.id,
                        initialUrl: t.currentRawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? Object.assign(
                              Object.assign({}, this.lastSuccessfulNavigation),
                              { previousNavigation: null }
                            )
                          : null,
                      };
                    }),
                    vc((t) => {
                      const n =
                        !this.navigated ||
                        t.extractedUrl.toString() !==
                          this.browserUrlTree.toString();
                      if (
                        ("reload" === this.onSameUrlNavigation || n) &&
                        this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                      )
                        return Xa(t).pipe(
                          vc((t) => {
                            const n = this.transitions.getValue();
                            return (
                              e.next(
                                new kc(
                                  t.id,
                                  this.serializeUrl(t.extractedUrl),
                                  t.source,
                                  t.restoredState
                                )
                              ),
                              n !== this.transitions.getValue() ? ql : [t]
                            );
                          }),
                          vc((t) => Promise.resolve(t)),
                          ((r = this.ngModule.injector),
                          (s = this.configLoader),
                          (o = this.urlSerializer),
                          (i = this.config),
                          function (t) {
                            return t.pipe(
                              vc((t) =>
                                (function (t, e, n, r, s) {
                                  return new nh(t, e, n, r, s).apply();
                                })(r, s, o, t.extractedUrl, i).pipe(
                                  U((e) =>
                                    Object.assign(Object.assign({}, t), {
                                      urlAfterRedirects: e,
                                    })
                                  )
                                )
                              )
                            );
                          }),
                          pc((t) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: t.urlAfterRedirects }
                            );
                          }),
                          (function (t, e, n, r, s) {
                            return function (o) {
                              return o.pipe(
                                F((o) =>
                                  (function (
                                    t,
                                    e,
                                    n,
                                    r,
                                    s = "emptyOnly",
                                    o = "legacy"
                                  ) {
                                    return new wh(t, e, n, r, s, o).recognize();
                                  })(
                                    t,
                                    e,
                                    o.urlAfterRedirects,
                                    n(o.urlAfterRedirects),
                                    r,
                                    s
                                  ).pipe(
                                    U((t) =>
                                      Object.assign(Object.assign({}, o), {
                                        targetSnapshot: t,
                                      })
                                    )
                                  )
                                )
                              );
                            };
                          })(
                            this.rootComponentType,
                            this.config,
                            (t) => this.serializeUrl(t),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          pc((t) => {
                            "eager" === this.urlUpdateStrategy &&
                              (t.extras.skipLocationChange ||
                                this.setBrowserUrl(
                                  t.urlAfterRedirects,
                                  !!t.extras.replaceUrl,
                                  t.id,
                                  t.extras.state
                                ),
                              (this.browserUrlTree = t.urlAfterRedirects));
                          }),
                          pc((t) => {
                            const n = new Oc(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            e.next(n);
                          })
                        );
                      var r, s, o, i;
                      if (
                        n &&
                        this.rawUrlTree &&
                        this.urlHandlingStrategy.shouldProcessUrl(
                          this.rawUrlTree
                        )
                      ) {
                        const {
                            id: n,
                            extractedUrl: r,
                            source: s,
                            restoredState: o,
                            extras: i,
                          } = t,
                          a = new kc(n, this.serializeUrl(r), s, o);
                        e.next(a);
                        const l = Tu(r, this.rootComponentType).snapshot;
                        return Xa(
                          Object.assign(Object.assign({}, t), {
                            targetSnapshot: l,
                            urlAfterRedirects: r,
                            extras: Object.assign(Object.assign({}, i), {
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            }),
                          })
                        );
                      }
                      return (
                        (this.rawUrlTree = t.rawUrl),
                        (this.browserUrlTree = t.urlAfterRedirects),
                        t.resolve(null),
                        ql
                      );
                    }),
                    kh((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: o, replaceUrl: i },
                      } = t;
                      return this.hooks.beforePreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!o,
                        replaceUrl: !!i,
                      });
                    }),
                    pc((t) => {
                      const e = new Pc(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot
                      );
                      this.triggerEvent(e);
                    }),
                    U((t) =>
                      Object.assign(Object.assign({}, t), {
                        guards: ch(
                          t.targetSnapshot,
                          t.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                    ),
                    (function (t, e) {
                      return function (n) {
                        return n.pipe(
                          F((n) => {
                            const {
                              targetSnapshot: r,
                              currentSnapshot: s,
                              guards: {
                                canActivateChecks: o,
                                canDeactivateChecks: i,
                              },
                            } = n;
                            return 0 === i.length && 0 === o.length
                              ? Xa(
                                  Object.assign(Object.assign({}, n), {
                                    guardsResult: !0,
                                  })
                                )
                              : (function (t, e, n, r) {
                                  return L(t).pipe(
                                    F((t) =>
                                      (function (t, e, n, r, s) {
                                        const o =
                                          e && e.routeConfig
                                            ? e.routeConfig.canDeactivate
                                            : null;
                                        return o && 0 !== o.length
                                          ? Xa(
                                              o.map((o) => {
                                                const i = uh(o, e, s);
                                                let a;
                                                if (
                                                  (function (t) {
                                                    return (
                                                      t && Qu(t.canDeactivate)
                                                    );
                                                  })(i)
                                                )
                                                  a = Yc(
                                                    i.canDeactivate(t, e, n, r)
                                                  );
                                                else {
                                                  if (!Qu(i))
                                                    throw new Error(
                                                      "Invalid CanDeactivate guard"
                                                    );
                                                  a = Yc(i(t, e, n, r));
                                                }
                                                return a.pipe(hc());
                                              })
                                            ).pipe(ph())
                                          : Xa(!0);
                                      })(t.component, t.route, n, e, r)
                                    ),
                                    hc((t) => !0 !== t, !0)
                                  );
                                })(i, r, s, t).pipe(
                                  F((n) =>
                                    n && "boolean" == typeof n
                                      ? (function (t, e, n, r) {
                                          return L(e).pipe(
                                            tl((e) =>
                                              L([
                                                gh(e.route.parent, r),
                                                fh(e.route, r),
                                                yh(t, e.path, n),
                                                mh(t, e.route, n),
                                              ]).pipe(
                                                Wl(),
                                                hc((t) => !0 !== t, !0)
                                              )
                                            ),
                                            hc((t) => !0 !== t, !0)
                                          );
                                        })(r, o, t, e)
                                      : Xa(n)
                                  ),
                                  U((t) =>
                                    Object.assign(Object.assign({}, n), {
                                      guardsResult: t,
                                    })
                                  )
                                );
                          })
                        );
                      };
                    })(this.ngModule.injector, (t) => this.triggerEvent(t)),
                    pc((t) => {
                      if (Ku(t.guardsResult)) {
                        const e = Bc(
                          `Redirecting to "${this.serializeUrl(
                            t.guardsResult
                          )}"`
                        );
                        throw ((e.url = t.guardsResult), e);
                      }
                    }),
                    pc((t) => {
                      const e = new jc(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot,
                        !!t.guardsResult
                      );
                      this.triggerEvent(e);
                    }),
                    el((t) => {
                      if (!t.guardsResult) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new Rc(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          ""
                        );
                        return e.next(n), t.resolve(!1), !1;
                      }
                      return !0;
                    }),
                    kh((t) => {
                      if (t.guards.canActivateChecks.length)
                        return Xa(t).pipe(
                          pc((t) => {
                            const e = new Nc(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          }),
                          vc((t) => {
                            let n = !1;
                            return Xa(t).pipe(
                              ((r = this.paramsInheritanceStrategy),
                              (s = this.ngModule.injector),
                              function (t) {
                                return t.pipe(
                                  F((t) => {
                                    const {
                                      targetSnapshot: e,
                                      guards: { canActivateChecks: n },
                                    } = t;
                                    if (!n.length) return Xa(t);
                                    let o = 0;
                                    return L(n).pipe(
                                      tl((t) =>
                                        (function (t, e, n, r) {
                                          return (function (t, e, n, r) {
                                            const s = Object.keys(t);
                                            if (0 === s.length) return Xa({});
                                            const o = {};
                                            return L(s).pipe(
                                              F((s) =>
                                                (function (t, e, n, r) {
                                                  const s = uh(t, e, r);
                                                  return Yc(
                                                    s.resolve
                                                      ? s.resolve(e, n)
                                                      : s(e, n)
                                                  );
                                                })(t[s], e, n, r).pipe(
                                                  pc((t) => {
                                                    o[s] = t;
                                                  })
                                                )
                                              ),
                                              Ql(1),
                                              F(() =>
                                                Object.keys(o).length ===
                                                s.length
                                                  ? Xa(o)
                                                  : ql
                                              )
                                            );
                                          })(t._resolve, t, e, r).pipe(
                                            U(
                                              (e) => (
                                                (t._resolvedData = e),
                                                (t.data = Object.assign(
                                                  Object.assign({}, t.data),
                                                  Au(t, n).resolve
                                                )),
                                                null
                                              )
                                            )
                                          );
                                        })(t.route, e, r, s)
                                      ),
                                      pc(() => o++),
                                      Ql(1),
                                      F((e) => (o === n.length ? Xa(t) : ql))
                                    );
                                  })
                                );
                              }),
                              pc({
                                next: () => (n = !0),
                                complete: () => {
                                  if (!n) {
                                    const n = new Rc(
                                      t.id,
                                      this.serializeUrl(t.extractedUrl),
                                      "At least one route resolver didn't emit any value."
                                    );
                                    e.next(n), t.resolve(!1);
                                  }
                                },
                              })
                            );
                            var r, s;
                          }),
                          pc((t) => {
                            const e = new Uc(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          })
                        );
                    }),
                    kh((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: o, replaceUrl: i },
                      } = t;
                      return this.hooks.afterPreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!o,
                        replaceUrl: !!i,
                      });
                    }),
                    U((t) => {
                      const e = (function (t, e, n) {
                        const r = (function t(e, n, r) {
                          if (
                            r &&
                            e.shouldReuseRoute(n.value, r.value.snapshot)
                          ) {
                            const s = r.value;
                            s._futureSnapshot = n.value;
                            const o = (function (e, n, r) {
                              return n.children.map((n) => {
                                for (const s of r.children)
                                  if (
                                    e.shouldReuseRoute(
                                      s.value.snapshot,
                                      n.value
                                    )
                                  )
                                    return t(e, n, s);
                                return t(e, n);
                              });
                            })(e, n, r);
                            return new Su(s, o);
                          }
                          {
                            const r = e.retrieve(n.value);
                            if (r) {
                              const t = r.route;
                              return (
                                (function t(e, n) {
                                  if (
                                    e.value.routeConfig !== n.value.routeConfig
                                  )
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot created from a different route"
                                    );
                                  if (e.children.length !== n.children.length)
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot with a different number of children"
                                    );
                                  n.value._futureSnapshot = e.value;
                                  for (let r = 0; r < e.children.length; ++r)
                                    t(e.children[r], n.children[r]);
                                })(n, t),
                                t
                              );
                            }
                            {
                              const r = new ku(
                                  new Ll((s = n.value).url),
                                  new Ll(s.params),
                                  new Ll(s.queryParams),
                                  new Ll(s.fragment),
                                  new Ll(s.data),
                                  s.outlet,
                                  s.component,
                                  s
                                ),
                                o = n.children.map((n) => t(e, n));
                              return new Su(r, o);
                            }
                          }
                          var s;
                        })(t, e._root, n ? n._root : void 0);
                        return new Eu(r, e);
                      })(
                        this.routeReuseStrategy,
                        t.targetSnapshot,
                        t.currentRouterState
                      );
                      return Object.assign(Object.assign({}, t), {
                        targetRouterState: e,
                      });
                    }),
                    pc((t) => {
                      (this.currentUrlTree = t.urlAfterRedirects),
                        (this.rawUrlTree = this.urlHandlingStrategy.merge(
                          this.currentUrlTree,
                          t.rawUrl
                        )),
                        (this.routerState = t.targetRouterState),
                        "deferred" === this.urlUpdateStrategy &&
                          (t.extras.skipLocationChange ||
                            this.setBrowserUrl(
                              this.rawUrlTree,
                              !!t.extras.replaceUrl,
                              t.id,
                              t.extras.state
                            ),
                          (this.browserUrlTree = t.urlAfterRedirects));
                    }),
                    ((o = this.rootContexts),
                    (i = this.routeReuseStrategy),
                    (a = (t) => this.triggerEvent(t)),
                    U(
                      (t) => (
                        new Gu(
                          i,
                          t.targetRouterState,
                          t.currentRouterState,
                          a
                        ).activate(o),
                        t
                      )
                    )),
                    pc({
                      next() {
                        n = !0;
                      },
                      complete() {
                        n = !0;
                      },
                    }),
                    ((s = () => {
                      if (!n && !r) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new Rc(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
                        );
                        e.next(n), t.resolve(!1);
                      }
                      this.currentNavigation = null;
                    }),
                    (t) => t.lift(new Cc(s))),
                    oc((n) => {
                      if (((r = !0), (s = n) && s.ngNavigationCancelingError)) {
                        const r = Ku(n.url);
                        r ||
                          ((this.navigated = !0),
                          this.resetStateAndUrl(
                            t.currentRouterState,
                            t.currentUrlTree,
                            t.rawUrl
                          ));
                        const s = new Rc(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n.message
                        );
                        e.next(s),
                          r
                            ? setTimeout(() => {
                                const e = this.urlHandlingStrategy.merge(
                                  n.url,
                                  this.rawUrlTree
                                );
                                return this.scheduleNavigation(
                                  e,
                                  "imperative",
                                  null,
                                  {
                                    skipLocationChange:
                                      t.extras.skipLocationChange,
                                    replaceUrl:
                                      "eager" === this.urlUpdateStrategy,
                                  },
                                  {
                                    resolve: t.resolve,
                                    reject: t.reject,
                                    promise: t.promise,
                                  }
                                );
                              }, 0)
                            : t.resolve(!1);
                      } else {
                        this.resetStateAndUrl(
                          t.currentRouterState,
                          t.currentUrlTree,
                          t.rawUrl
                        );
                        const r = new Ic(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n
                        );
                        e.next(r);
                        try {
                          t.resolve(this.errorHandler(n));
                        } catch (o) {
                          t.reject(o);
                        }
                      }
                      var s;
                      return ql;
                    })
                  );
                  var s, o, i, a;
                })
              );
            }
            resetRootComponentType(t) {
              (this.rootComponentType = t),
                (this.routerState.root.component = this.rootComponentType);
            }
            getTransition() {
              const t = this.transitions.value;
              return (t.urlAfterRedirects = this.browserUrlTree), t;
            }
            setTransition(t) {
              this.transitions.next(
                Object.assign(Object.assign({}, this.getTransition()), t)
              );
            }
            initialNavigation() {
              this.setUpLocationChangeListener(),
                0 === this.navigationId &&
                  this.navigateByUrl(this.location.path(!0), {
                    replaceUrl: !0,
                  });
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((t) => {
                  let e = this.parseUrl(t.url);
                  const n = "popstate" === t.type ? "popstate" : "hashchange",
                    r = t.state && t.state.navigationId ? t.state : null;
                  setTimeout(() => {
                    this.scheduleNavigation(e, n, r, { replaceUrl: !0 });
                  }, 0);
                }));
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.currentNavigation;
            }
            triggerEvent(t) {
              this.events.next(t);
            }
            resetConfig(t) {
              Ih(t),
                (this.config = t.map(jh)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = null));
            }
            createUrlTree(t, e = {}) {
              const {
                relativeTo: n,
                queryParams: r,
                fragment: s,
                preserveQueryParams: o,
                queryParamsHandling: i,
                preserveFragment: a,
              } = e;
              Kn() &&
                o &&
                console &&
                console.warn &&
                console.warn(
                  "preserveQueryParams is deprecated, use queryParamsHandling instead."
                );
              const l = n || this.routerState.root,
                c = a ? this.currentUrlTree.fragment : s;
              let u = null;
              if (i)
                switch (i) {
                  case "merge":
                    u = Object.assign(
                      Object.assign({}, this.currentUrlTree.queryParams),
                      r
                    );
                    break;
                  case "preserve":
                    u = this.currentUrlTree.queryParams;
                    break;
                  default:
                    u = r || null;
                }
              else u = o ? this.currentUrlTree.queryParams : r || null;
              return (
                null !== u && (u = this.removeEmptyProps(u)),
                (function (t, e, n, r, s) {
                  if (0 === n.length) return Du(e.root, e.root, e, r, s);
                  const o = (function (t) {
                    if (
                      "string" == typeof t[0] &&
                      1 === t.length &&
                      "/" === t[0]
                    )
                      return new Hu(!0, 0, t);
                    let e = 0,
                      n = !1;
                    const r = t.reduce((t, r, s) => {
                      if ("object" == typeof r && null != r) {
                        if (r.outlets) {
                          const e = {};
                          return (
                            Jc(r.outlets, (t, n) => {
                              e[n] = "string" == typeof t ? t.split("/") : t;
                            }),
                            [...t, { outlets: e }]
                          );
                        }
                        if (r.segmentPath) return [...t, r.segmentPath];
                      }
                      return "string" != typeof r
                        ? [...t, r]
                        : 0 === s
                        ? (r.split("/").forEach((r, s) => {
                            (0 == s && "." === r) ||
                              (0 == s && "" === r
                                ? (n = !0)
                                : ".." === r
                                ? e++
                                : "" != r && t.push(r));
                          }),
                          t)
                        : [...t, r];
                    }, []);
                    return new Hu(n, e, r);
                  })(n);
                  if (o.toRoot()) return Du(e.root, new eu([], {}), e, r, s);
                  const i = (function (t, e, n) {
                      if (t.isAbsolute) return new Mu(e.root, !0, 0);
                      if (-1 === n.snapshot._lastPathIndex) {
                        const t = n.snapshot._urlSegment;
                        return new Mu(t, t === e.root, 0);
                      }
                      const r = Uu(t.commands[0]) ? 0 : 1;
                      return (function (t, e, n) {
                        let r = t,
                          s = e,
                          o = n;
                        for (; o > s; ) {
                          if (((o -= s), (r = r.parent), !r))
                            throw new Error("Invalid number of '../'");
                          s = r.segments.length;
                        }
                        return new Mu(r, !1, s - o);
                      })(
                        n.snapshot._urlSegment,
                        n.snapshot._lastPathIndex + r,
                        t.numberOfDoubleDots
                      );
                    })(o, e, t),
                    a = i.processChildren
                      ? zu(i.segmentGroup, i.index, o.commands)
                      : Fu(i.segmentGroup, i.index, o.commands);
                  return Du(i.segmentGroup, a, e, r, s);
                })(l, this.currentUrlTree, t, u, c)
              );
            }
            navigateByUrl(t, e = { skipLocationChange: !1 }) {
              Kn() &&
                this.isNgZoneEnabled &&
                !xi.isInAngularZone() &&
                this.console.warn(
                  "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
                );
              const n = Ku(t) ? t : this.parseUrl(t),
                r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
              return this.scheduleNavigation(r, "imperative", null, e);
            }
            navigate(t, e = { skipLocationChange: !1 }) {
              return (
                (function (t) {
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (null == n)
                      throw new Error(
                        `The requested path contains ${n} segment at index ${e}`
                      );
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, e), e)
              );
            }
            serializeUrl(t) {
              return this.urlSerializer.serialize(t);
            }
            parseUrl(t) {
              let e;
              try {
                e = this.urlSerializer.parse(t);
              } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t);
              }
              return e;
            }
            isActive(t, e) {
              if (Ku(t)) return Xc(this.currentUrlTree, t, e);
              const n = this.parseUrl(t);
              return Xc(this.currentUrlTree, n, e);
            }
            removeEmptyProps(t) {
              return Object.keys(t).reduce((e, n) => {
                const r = t[n];
                return null != r && (e[n] = r), e;
              }, {});
            }
            processNavigations() {
              this.navigations.subscribe(
                (t) => {
                  (this.navigated = !0),
                    (this.lastSuccessfulId = t.id),
                    this.events.next(
                      new Ac(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(this.currentUrlTree)
                      )
                    ),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    (this.currentNavigation = null),
                    t.resolve(!0);
                },
                (t) => {
                  this.console.warn("Unhandled Navigation Error: ");
                }
              );
            }
            scheduleNavigation(t, e, n, r, s) {
              const o = this.getTransition();
              if (
                o &&
                "imperative" !== e &&
                "imperative" === o.source &&
                o.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              if (
                o &&
                "hashchange" == e &&
                "popstate" === o.source &&
                o.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              if (
                o &&
                "popstate" == e &&
                "hashchange" === o.source &&
                o.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              let i, a, l;
              s
                ? ((i = s.resolve), (a = s.reject), (l = s.promise))
                : (l = new Promise((t, e) => {
                    (i = t), (a = e);
                  }));
              const c = ++this.navigationId;
              return (
                this.setTransition({
                  id: c,
                  source: e,
                  restoredState: n,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.rawUrlTree,
                  rawUrl: t,
                  extras: r,
                  resolve: i,
                  reject: a,
                  promise: l,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                l.catch((t) => Promise.reject(t))
              );
            }
            setBrowserUrl(t, e, n, r) {
              const s = this.urlSerializer.serialize(t);
              (r = r || {}),
                this.location.isCurrentPathEqualTo(s) || e
                  ? this.location.replaceState(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n })
                    )
                  : this.location.go(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n })
                    );
            }
            resetStateAndUrl(t, e, n) {
              (this.routerState = t),
                (this.currentUrlTree = e),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n
                )),
                this.resetUrlToCurrentUrlTree();
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                { navigationId: this.lastSuccessfulId }
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                Vt(As),
                Vt(ou),
                Vt(Hh),
                Vt(fa),
                Vt($s),
                Vt(Vi),
                Vt(wi),
                Vt(void 0)
              );
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Vh = (() => {
          class t {
            constructor(t, e, n) {
              (this.router = t),
                (this.route = e),
                (this.locationStrategy = n),
                (this.commands = []),
                (this.onChanges = new S()),
                (this.subscription = t.events.subscribe((t) => {
                  t instanceof Ac && this.updateTargetUrlAndHref();
                }));
            }
            set routerLink(t) {
              this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
            }
            set preserveQueryParams(t) {
              Kn() &&
                console &&
                console.warn &&
                console.warn(
                  "preserveQueryParams is deprecated, use queryParamsHandling instead."
                ),
                (this.preserve = t);
            }
            ngOnChanges(t) {
              this.updateTargetUrlAndHref(), this.onChanges.next(this);
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            onClick(t, e, n, r) {
              if (0 !== t || e || n || r) return !0;
              if ("string" == typeof this.target && "_self" != this.target)
                return !0;
              const s = {
                skipLocationChange: qh(this.skipLocationChange),
                replaceUrl: qh(this.replaceUrl),
                state: this.state,
              };
              return this.router.navigateByUrl(this.urlTree, s), !1;
            }
            updateTargetUrlAndHref() {
              this.href = this.locationStrategy.prepareExternalUrl(
                this.router.serializeUrl(this.urlTree)
              );
            }
            get urlTree() {
              return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: qh(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: qh(this.preserveFragment),
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Js($h), Js(ku), Js(ca));
            }),
            (t.ɵdir = ce({
              type: t,
              selectors: [
                ["a", "routerLink", ""],
                ["area", "routerLink", ""],
              ],
              hostVars: 2,
              hostBindings: function (t, e) {
                1 & t &&
                  ro("click", function (t) {
                    return e.onClick(
                      t.button,
                      t.ctrlKey,
                      t.metaKey,
                      t.shiftKey
                    );
                  }),
                  2 & t && (lo("href", e.href, tr), Ks("target", e.target));
              },
              inputs: {
                routerLink: "routerLink",
                preserveQueryParams: "preserveQueryParams",
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                state: "state",
              },
              features: [be],
            })),
            t
          );
        })();
      function qh(t) {
        return "" === t || !!t;
      }
      let Bh = (() => {
        class t {
          constructor(t, e, n, r, s) {
            (this.parentContexts = t),
              (this.location = e),
              (this.resolver = n),
              (this.changeDetector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new ti()),
              (this.deactivateEvents = new ti()),
              (this.name = r || "primary"),
              t.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const t = this.parentContexts.getContext(this.name);
              t &&
                t.route &&
                (t.attachRef
                  ? this.attach(t.attachRef, t.route)
                  : this.activateWith(t.route, t.resolver || null));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const t = this.activated;
            return (this.activated = null), (this._activatedRoute = null), t;
          }
          attach(t, e) {
            (this.activated = t),
              (this._activatedRoute = e),
              this.location.insert(t.hostView);
          }
          deactivate() {
            if (this.activated) {
              const t = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t);
            }
          }
          activateWith(t, e) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = t;
            const n = (e = e || this.resolver).resolveComponentFactory(
                t._futureSnapshot.routeConfig.component
              ),
              r = this.parentContexts.getOrCreateContext(this.name).children,
              s = new Gh(t, r, this.location.injector);
            (this.activated = this.location.createComponent(
              n,
              this.location.length,
              s
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(
              Js(Hh),
              Js(Do),
              Js(po),
              ("name",
              (function (t, e) {
                const n = t.attrs;
                if (n) {
                  const t = n.length;
                  let e = 0;
                  for (; e < t; ) {
                    const r = n[e];
                    if (mn(r)) break;
                    if (0 === r) e += 2;
                    else if ("number" == typeof r)
                      for (e++; e < t && "string" == typeof n[e]; ) e++;
                    else {
                      if ("name" === r) return n[e + 1];
                      e += 2;
                    }
                  }
                }
                return null;
              })($e())),
              Js(Ts)
            );
          }),
          (t.ɵdir = ce({
            type: t,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
            },
            exportAs: ["outlet"],
          })),
          t
        );
      })();
      class Gh {
        constructor(t, e, n) {
          (this.route = t), (this.childContexts = e), (this.parent = n);
        }
        get(t, e) {
          return t === ku
            ? this.route
            : t === Hh
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      class Wh {}
      class Zh {
        preload(t, e) {
          return Xa(null);
        }
      }
      let Qh = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.router = t),
                (this.injector = r),
                (this.preloadingStrategy = s),
                (this.loader = new Uh(
                  e,
                  n,
                  (e) => t.triggerEvent(new Dc(e)),
                  (e) => t.triggerEvent(new Hc(e))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  el((t) => t instanceof Ac),
                  tl(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const t = this.injector.get(Wt);
              return this.processRoutes(t, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(t, e) {
              const n = [];
              for (const r of e)
                if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                  const t = r._loadedConfig;
                  n.push(this.processRoutes(t.module, t.routes));
                } else
                  r.loadChildren && !r.canLoad
                    ? n.push(this.preloadConfig(t, r))
                    : r.children && n.push(this.processRoutes(t, r.children));
              return L(n).pipe(
                V(),
                U((t) => {})
              );
            }
            preloadConfig(t, e) {
              return this.preloadingStrategy.preload(e, () =>
                this.loader
                  .load(t.injector, e)
                  .pipe(
                    F(
                      (t) => (
                        (e._loadedConfig = t),
                        this.processRoutes(t.module, t.routes)
                      )
                    )
                  )
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Vt($h), Vt(Vi), Vt(wi), Vt($s), Vt(Wh));
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Kh = (() => {
          class t {
            constructor(t, e, n = {}) {
              (this.router = t),
                (this.viewportScroller = e),
                (this.options = n),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (n.scrollPositionRestoration =
                  n.scrollPositionRestoration || "disabled"),
                (n.anchorScrolling = n.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof kc
                  ? ((this.store[
                      this.lastId
                    ] = this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState
                      ? t.restoredState.navigationId
                      : 0))
                  : t instanceof Ac &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.router.parseUrl(t.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof $c &&
                  (t.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(t, e) {
              this.router.triggerEvent(
                new $c(
                  t,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  e
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Vt($h), Vt(xa), Vt(void 0));
            }),
            (t.ɵprov = it({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Jh = new jt("ROUTER_CONFIGURATION"),
        Yh = new jt("ROUTER_FORROOT_GUARD"),
        Xh = [
          fa,
          { provide: ou, useClass: iu },
          {
            provide: $h,
            useFactory: function (t, e, n, r, s, o, i, a = {}, l, c) {
              const u = new $h(null, t, e, n, r, s, o, Qc(i));
              if (
                (l && (u.urlHandlingStrategy = l),
                c && (u.routeReuseStrategy = c),
                a.errorHandler && (u.errorHandler = a.errorHandler),
                a.malformedUriErrorHandler &&
                  (u.malformedUriErrorHandler = a.malformedUriErrorHandler),
                a.enableTracing)
              ) {
                const t = Yi();
                u.events.subscribe((e) => {
                  t.logGroup("Router Event: " + e.constructor.name),
                    t.log(e.toString()),
                    t.log(e),
                    t.logGroupEnd();
                });
              }
              return (
                a.onSameUrlNavigation &&
                  (u.onSameUrlNavigation = a.onSameUrlNavigation),
                a.paramsInheritanceStrategy &&
                  (u.paramsInheritanceStrategy = a.paramsInheritanceStrategy),
                a.urlUpdateStrategy &&
                  (u.urlUpdateStrategy = a.urlUpdateStrategy),
                a.relativeLinkResolution &&
                  (u.relativeLinkResolution = a.relativeLinkResolution),
                u
              );
            },
            deps: [
              ou,
              Hh,
              fa,
              $s,
              Vi,
              wi,
              Nh,
              Jh,
              [class {}, new et()],
              [class {}, new et()],
            ],
          },
          Hh,
          {
            provide: ku,
            useFactory: function (t) {
              return t.routerState.root;
            },
            deps: [$h],
          },
          { provide: Vi, useClass: Gi },
          Qh,
          Zh,
          class {
            preload(t, e) {
              return e().pipe(oc(() => Xa(null)));
            }
          },
          { provide: Jh, useValue: { enableTracing: !1 } },
        ];
      function td() {
        return new Di("Router", $h);
      }
      let ed = (() => {
        class t {
          constructor(t, e) {}
          static forRoot(e, n) {
            return {
              ngModule: t,
              providers: [
                Xh,
                od(e),
                {
                  provide: Yh,
                  useFactory: sd,
                  deps: [[$h, new et(), new rt()]],
                },
                { provide: Jh, useValue: n || {} },
                {
                  provide: ca,
                  useFactory: rd,
                  deps: [ta, [new tt(ha), new et()], Jh],
                },
                { provide: Kh, useFactory: nd, deps: [$h, xa, Jh] },
                {
                  provide: Wh,
                  useExisting:
                    n && n.preloadingStrategy ? n.preloadingStrategy : Zh,
                },
                { provide: Di, multi: !0, useFactory: td },
                [
                  id,
                  { provide: ei, multi: !0, useFactory: ad, deps: [id] },
                  { provide: cd, useFactory: ld, deps: [id] },
                  { provide: li, multi: !0, useExisting: cd },
                ],
              ],
            };
          }
          static forChild(e) {
            return { ngModule: t, providers: [od(e)] };
          }
        }
        return (
          (t.ɵmod = ae({ type: t })),
          (t.ɵinj = at({
            factory: function (e) {
              return new (e || t)(Vt(Yh, 8), Vt($h, 8));
            },
          })),
          t
        );
      })();
      function nd(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new Kh(t, e, n);
      }
      function rd(t, e, n = {}) {
        return n.useHash ? new pa(t, e) : new da(t, e);
      }
      function sd(t) {
        if (t)
          throw new Error(
            "RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function od(t) {
        return [
          { provide: Vs, multi: !0, useValue: t },
          { provide: Nh, multi: !0, useValue: t },
        ];
      }
      let id = (() => {
        class t {
          constructor(t) {
            (this.injector = t),
              (this.initNavigation = !1),
              (this.resultOfPreactivationDone = new S());
          }
          appInitializer() {
            return this.injector.get(na, Promise.resolve(null)).then(() => {
              let t = null;
              const e = new Promise((e) => (t = e)),
                n = this.injector.get($h),
                r = this.injector.get(Jh);
              if (this.isLegacyDisabled(r) || this.isLegacyEnabled(r)) t(!0);
              else if ("disabled" === r.initialNavigation)
                n.setUpLocationChangeListener(), t(!0);
              else {
                if ("enabled" !== r.initialNavigation)
                  throw new Error(
                    `Invalid initialNavigation options: '${r.initialNavigation}'`
                  );
                (n.hooks.afterPreactivation = () =>
                  this.initNavigation
                    ? Xa(null)
                    : ((this.initNavigation = !0),
                      t(!0),
                      this.resultOfPreactivationDone)),
                  n.initialNavigation();
              }
              return e;
            });
          }
          bootstrapListener(t) {
            const e = this.injector.get(Jh),
              n = this.injector.get(Qh),
              r = this.injector.get(Kh),
              s = this.injector.get($h),
              o = this.injector.get(zi);
            t === o.components[0] &&
              (this.isLegacyEnabled(e)
                ? s.initialNavigation()
                : this.isLegacyDisabled(e) && s.setUpLocationChangeListener(),
              n.setUpPreloading(),
              r.init(),
              s.resetRootComponentType(o.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          isLegacyEnabled(t) {
            return (
              "legacy_enabled" === t.initialNavigation ||
              !0 === t.initialNavigation ||
              void 0 === t.initialNavigation
            );
          }
          isLegacyDisabled(t) {
            return (
              "legacy_disabled" === t.initialNavigation ||
              !1 === t.initialNavigation
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Vt($s));
          }),
          (t.ɵprov = it({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function ad(t) {
        return t.appInitializer.bind(t);
      }
      function ld(t) {
        return t.bootstrapListener.bind(t);
      }
      const cd = new jt("Router Initializer");
      let ud = (() => {
        class t {
          constructor() {}
          ngOnInit() {
            jQuery(document).ready(function () {
              window.SHIPPING_SETTINGS &&
                window.SHIPPING_SETTINGS.imageCarousel &&
                window.SHIPPING_SETTINGS.imageCarousel();
            });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = re({
            type: t,
            selectors: [["app-home"]],
            decls: 107,
            vars: 0,
            consts: [
              [
                "id",
                "major-services",
                1,
                "major-services",
                "gray-boxes",
                "container-fluid",
              ],
              [1, "container-fluid", "mt-5"],
              [1, "row"],
              [1, "heading", "title"],
              [1, "headul"],
              [1, "subheading"],
              ["id", "mission", 1, "mission", "bg-lightgray"],
              [1, "container"],
              [
                1,
                "col-lg-5",
                "col-md-5",
                "col-sm-12",
                "col-xs-12",
                "text-area",
              ],
              [1, "heading", "left-align", "title"],
              [1, "headul", "left-align"],
              [
                1,
                "col-lg-7",
                "col-md-7",
                "col-sm-12",
                "col-xs-12",
                "slider-area",
              ],
              ["id", "image-slider", 1, "owl-carousel"],
              [1, ""],
              [
                "alt",
                "mission-carousel-image",
                "data-src",
                "assets/img/carouselmision_1.png",
                "src",
                "#",
                1,
                "lazyOwl",
                "img-responsive",
              ],
              [
                "alt",
                "mission-carousel-image",
                "data-src",
                "assets/img/carouselmision_2.png",
                "src",
                "#",
                1,
                "lazyOwl",
                "img-responsive",
              ],
              [
                "alt",
                "mission-carousel-image",
                "data-src",
                "assets/img/carouselmision_3.png",
                "src",
                "#",
                1,
                "lazyOwl",
                "img-responsive",
              ],
              ["id", "whoweare", 1, "whoweare", "padding-bottom-50"],
              [
                1,
                "col-lg-4",
                "col-md-4",
                "col-sm-12",
                "col-xs-12",
                "whoweare-pic",
              ],
              [
                "src",
                "assets/img/nuestravision.png",
                "alt",
                "Who We Are",
                1,
                "img-responsive",
              ],
              [
                1,
                "col-lg-8",
                "col-md-8",
                "col-sm-12",
                "col-xs-12",
                "whoweare-info",
              ],
              [1, "heading", "left-align", "title", "title"],
              ["id", "major-services", 1, "major-services", "bg-lightgray"],
              [
                "data-effect",
                "fadeInUp",
                1,
                "col-lg-4",
                "col-md-4",
                "col-md-offset-0",
                "col-sm-8",
                "col-sm-offset-2",
                "col-xs-10",
                "col-xs-offset-1",
                "service",
                "inviewport",
                "animated",
                "delay1",
              ],
              [1, "service-wrap"],
              [1, "info"],
              [1, "title"],
              [
                "data-effect",
                "fadeInUp",
                1,
                "col-lg-4",
                "col-md-4",
                "col-md-offset-0",
                "col-sm-8",
                "col-sm-offset-2",
                "col-xs-10",
                "col-xs-offset-1",
                "service",
                "inviewport",
                "animated",
                "delay2",
              ],
              [
                "data-effect",
                "fadeInUp",
                1,
                "col-lg-4",
                "col-md-4",
                "col-md-offset-0",
                "col-sm-8",
                "col-sm-offset-2",
                "col-xs-10",
                "col-xs-offset-1",
                "service",
                "inviewport",
                "animated",
                "delay3",
              ],
              ["id", "tracking-app-tablet", 1, "bg-primary", "white-text"],
              [1, "heading"],
              [1, "features"],
              [
                "data-effect",
                "fadeInUp",
                1,
                "col-lg-6",
                "col-md-6",
                "col-sm-6",
                "col-xs-12",
                "feature-block",
                "inviewport",
                "animated",
                "delay1",
              ],
              [1, "icon-wrap"],
              [1, "icon", "icon-airplane68"],
              [
                "data-effect",
                "fadeInUp",
                1,
                "col-lg-6",
                "col-md-6",
                "col-sm-6",
                "col-xs-12",
                "feature-block",
                "inviewport",
                "animated",
                "delay2",
              ],
              [1, "icon", "icon-frontal19"],
              [1, "icon", "icon-boat17"],
              [1, "icon", "icon-ocean3"],
            ],
            template: function (t, e) {
              1 & t &&
                (Xs(0, "section", 0),
                Xs(1, "div", 1),
                Xs(2, "div", 2),
                Xs(3, "h1", 3),
                io(4, "NOSOTROS"),
                to(),
                eo(5, "div", 4),
                Xs(6, "p", 5),
                Xs(7, "strong"),
                io(8, "Transporte Nortruck SRL "),
                to(),
                io(
                  9,
                  " , es una empresa familiar que se inicia en el a\xf1o 2006 y que brinda servicios de transporte de carga por carretera. Trabajamos para ser una soluci\xf3n para nuestros clientes, basados en la seguridad, calidad, econom\xeda, rapidez y eficiencia, ofreciendo un servicio personalizado a nuestros clientes, adapt\xe1ndonos a sus necesidades."
                ),
                to(),
                to(),
                to(),
                to(),
                Xs(10, "section", 6),
                Xs(11, "div", 7),
                Xs(12, "div", 2),
                Xs(13, "div", 8),
                Xs(14, "h1", 9),
                io(15, "Nuestra mision"),
                to(),
                eo(16, "div", 10),
                Xs(17, "p"),
                io(
                  18,
                  "Brindar soluciones log\xedsticas que agreguen valor a nuestros clientes, con honestidad y relaciones sociales con nuestros proveedores. Comprometi\xe9ndonos en la mejora continua, cuidando del medio ambiente en el entorno que promueva el desarrollo de los colaboradores."
                ),
                to(),
                to(),
                Xs(19, "div", 11),
                Xs(20, "ul", 12),
                Xs(21, "li", 13),
                eo(22, "img", 14),
                to(),
                Xs(23, "li", 13),
                eo(24, "img", 15),
                to(),
                Xs(25, "li", 13),
                eo(26, "img", 16),
                to(),
                to(),
                to(),
                to(),
                to(),
                to(),
                Xs(27, "section", 17),
                Xs(28, "div", 7),
                Xs(29, "div", 2),
                Xs(30, "div", 18),
                eo(31, "img", 19),
                to(),
                Xs(32, "div", 20),
                Xs(33, "h1", 21),
                io(34, "Nuestra visi\xf3n"),
                to(),
                eo(35, "div", 10),
                Xs(36, "p"),
                io(
                  37,
                  "Ser una empresa l\xedder en el transporte de carga que ofrece soluci\xf3n a nuestros clientes, actuando responsablemente donde las personas se sienta orgullosas de trabajar en ello, comprometidos en llevar a la pr\xe1ctica los principios de desarrollo sustentable."
                ),
                to(),
                to(),
                to(),
                to(),
                to(),
                Xs(38, "section", 22),
                Xs(39, "div", 7),
                Xs(40, "div", 2),
                Xs(41, "h1", 3),
                io(42, "Nuestros valores"),
                to(),
                eo(43, "div", 4),
                Xs(44, "div", 23),
                Xs(45, "div", 24),
                Xs(46, "div", 25),
                Xs(47, "h4", 26),
                io(48, "Fidelidad"),
                to(),
                Xs(49, "p"),
                io(
                  50,
                  " Lealtad a los compromisos con nuestros clientes, empleados, proveedores y comunidad. "
                ),
                to(),
                to(),
                to(),
                to(),
                Xs(51, "div", 27),
                Xs(52, "div", 24),
                Xs(53, "div", 25),
                Xs(54, "h4", 26),
                io(55, "MEJORA CONTINUA"),
                to(),
                Xs(56, "p"),
                io(
                  57,
                  "Compromiso de innovar y dar soluciones a nuestros clientes."
                ),
                to(),
                eo(58, "br"),
                to(),
                to(),
                to(),
                Xs(59, "div", 28),
                Xs(60, "div", 24),
                Xs(61, "div", 25),
                Xs(62, "h4", 26),
                io(63, "HONESTIDAD"),
                to(),
                Xs(64, "p"),
                io(
                  65,
                  "Trato claro con nuestros clientes, colaboradores, proveedores y comunidad. "
                ),
                to(),
                eo(66, "br"),
                to(),
                to(),
                to(),
                to(),
                to(),
                to(),
                eo(67, "br"),
                Xs(68, "section", 29),
                Xs(69, "div", 7),
                Xs(70, "div", 2),
                Xs(71, "h1", 30),
                io(72, "Compromiso general"),
                to(),
                eo(73, "div", 4),
                Xs(74, "p", 5),
                io(
                  75,
                  "Desde transporte Nortrucksrl, trabajamos enfocados en ser para nuestros clientes en proveedor estrat\xe9gico para desarrollar sus negocios. Adapt\xe1ndonos a las necesidades de cada uno de nuestros clientes. Brindando un servicio personalizado para cada operaci\xf3n. Creemos firmemente que el crecimiento de nuestros clientes es el pilar fundamental para nuestro desarrollo como empresa."
                ),
                to(),
                Xs(76, "div", 31),
                Xs(77, "div", 32),
                Xs(78, "div", 33),
                eo(79, "i", 34),
                to(),
                Xs(80, "div", 25),
                eo(81, "h4", 26),
                Xs(82, "p"),
                io(
                  83,
                  "Asegurar la sustentabilidad de nuestras operaciones teniendo siempre en cuenta las consideraciones sociales, econ\xf3micas y ambientales de las mismas.."
                ),
                to(),
                to(),
                to(),
                Xs(84, "div", 35),
                Xs(85, "div", 33),
                eo(86, "i", 36),
                to(),
                Xs(87, "div", 25),
                eo(88, "h4", 26),
                Xs(89, "p"),
                io(
                  90,
                  "Desarrollar programas de concretizaci\xf3n y capacitaci\xf3n de nuestro personal a efectos de sensibilizar y promover su compromiso con la sustentabilidad. "
                ),
                to(),
                to(),
                to(),
                Xs(91, "div", 32),
                Xs(92, "div", 33),
                eo(93, "i", 37),
                to(),
                Xs(94, "div", 25),
                eo(95, "h4", 26),
                Xs(96, "p"),
                io(
                  97,
                  "Respetar los derechos humanos en general y de todo nuestro personal en particular."
                ),
                to(),
                to(),
                to(),
                Xs(98, "div", 35),
                Xs(99, "div", 33),
                eo(100, "i", 38),
                to(),
                Xs(101, "div", 25),
                eo(102, "h4", 26),
                Xs(103, "p"),
                io(
                  104,
                  "Colaborar con nuestra comunidad dentro de nuestras posibilidades. "
                ),
                to(),
                to(),
                to(),
                to(),
                to(),
                to(),
                to(),
                eo(105, "app-contact"),
                eo(106, "app-servicios"));
            },
            directives: [Hl, Ml],
            styles: [
              "@media (max-width:825px){*[_ngcontent-%COMP%]{font-size:50px!important;font-weight:500}}@media (max-width:991.98px){*[_ngcontent-%COMP%]{font-size:25px!important;font-weight:500}.title[_ngcontent-%COMP%]{font-weight:800}}",
            ],
          })),
          t
        );
      })();
      const hd = [
        { path: "", component: ud },
        { path: "home", component: ud },
        { path: "nuestros-servicios", component: Ml },
        {
          path: "cotizacion",
          component: (() => {
            class t {
              constructor() {}
              ngOnInit() {}
            }
            return (
              (t.ɵfac = function (e) {
                return new (e || t)();
              }),
              (t.ɵcmp = re({
                type: t,
                selectors: [["app-cotizacion"]],
                decls: 37,
                vars: 0,
                consts: [
                  ["id", "estimate", 1, "estimate"],
                  [1, "estimate-wrap"],
                  [1, "row"],
                  [
                    1,
                    "col-lg-8",
                    "col-md-8",
                    "col-lg-offset-1",
                    "col-md-offset-1",
                    "col-sm-offset-1",
                    "col-sm-10",
                    "col-xs-offset-1",
                    "col-xs-10",
                  ],
                  [1, "heading", "left-align"],
                  [1, "headul", "left-align"],
                  [1, "subheading", "left-align"],
                  [
                    1,
                    "col-lg-4",
                    "col-md-4",
                    "col-lg-offset-1",
                    "col-md-offset-1",
                    "col-sm-offset-1",
                    "col-sm-10",
                    "col-xs-offset-1",
                    "col-xs-10",
                  ],
                  ["action", "cotizar.php", "method", "post"],
                  [1, "col-xs-12"],
                  [
                    "type",
                    "text",
                    "name",
                    "origen",
                    "placeholder",
                    "Localidad de origen",
                    "id",
                    "origen",
                    1,
                    "transition",
                  ],
                  [
                    "type",
                    "text",
                    "name",
                    "destino",
                    "placeholder",
                    "Localidad de destino",
                    "id",
                    "destino",
                    1,
                    "transition",
                  ],
                  [
                    "type",
                    "text",
                    "name",
                    "peso",
                    "placeholder",
                    "Detalles de la carga",
                    "id",
                    "peso",
                    1,
                    "transition",
                  ],
                  [
                    "type",
                    "text",
                    "name",
                    "kilos",
                    "placeholder",
                    "Kilos de la mercader\xeda despachada",
                    "id",
                    "kilos",
                    1,
                    "transition",
                  ],
                  [
                    "type",
                    "text",
                    "name",
                    "valordeclarado",
                    "placeholder",
                    "Valor declarado para el seguro en $",
                    "id",
                    "valordeclarado",
                    1,
                    "transition",
                  ],
                  [
                    "type",
                    "text",
                    "name",
                    "phone",
                    "placeholder",
                    "Tel\xe9fono de contacto",
                    "id",
                    "est_width",
                    1,
                    "transition",
                  ],
                  [
                    "type",
                    "text",
                    "name",
                    "email",
                    "placeholder",
                    "Correo electr\xf3nico",
                    "id",
                    "est_total",
                    1,
                    "transition",
                  ],
                  [1, "col-xs-4"],
                  [
                    "type",
                    "submit",
                    "name",
                    "submit",
                    "value",
                    "Enviar",
                    "id",
                    "c_send",
                    1,
                    "btn",
                    "btn-primary",
                    "mb-5",
                  ],
                  [1, "col-lg-7", "col-md-7", "col-sm-12", "col-xs-12"],
                  [
                    "src",
                    "assets/img/service_estimate.png",
                    "alt",
                    "Estimate Fork Image",
                    1,
                    "img-responsive",
                    "style-dependent",
                  ],
                ],
                template: function (t, e) {
                  1 & t &&
                    (Xs(0, "section", 0),
                    Xs(1, "div", 1),
                    Xs(2, "div", 2),
                    Xs(3, "div", 3),
                    Xs(4, "h1", 4),
                    io(5, "Solicitud de presupuesto"),
                    to(),
                    eo(6, "div", 5),
                    Xs(7, "p", 6),
                    io(
                      8,
                      " Complete el siguiente formulario para solicitar una cotizaci\xf3n de env\xedo "
                    ),
                    to(),
                    to(),
                    Xs(9, "div", 7),
                    Xs(10, "div", 2),
                    Xs(11, "form", 8),
                    Xs(12, "div", 9),
                    eo(13, "label"),
                    eo(14, "input", 10),
                    to(),
                    Xs(15, "div", 9),
                    eo(16, "label"),
                    eo(17, "input", 11),
                    to(),
                    Xs(18, "div", 9),
                    eo(19, "label"),
                    eo(20, "input", 12),
                    to(),
                    Xs(21, "div", 9),
                    eo(22, "label"),
                    eo(23, "input", 13),
                    to(),
                    Xs(24, "div", 9),
                    eo(25, "label"),
                    eo(26, "input", 14),
                    to(),
                    Xs(27, "div", 9),
                    eo(28, "label"),
                    eo(29, "input", 15),
                    to(),
                    Xs(30, "div", 9),
                    eo(31, "label"),
                    eo(32, "input", 16),
                    to(),
                    Xs(33, "div", 17),
                    eo(34, "input", 18),
                    to(),
                    to(),
                    to(),
                    to(),
                    Xs(35, "div", 19),
                    eo(36, "img", 20),
                    to(),
                    to(),
                    to(),
                    to());
                },
                styles: [
                  "@media (max-width:825px){*[_ngcontent-%COMP%]{font-size:50px!important;font-weight:500}}@media (max-width:991.98px){*[_ngcontent-%COMP%]{font-size:25px!important;font-weight:500}.title[_ngcontent-%COMP%]{font-weight:800}}",
                ],
              })),
              t
            );
          })(),
        },
        { path: "contacto", component: Hl },
      ];
      let dd = (() => {
          class t {}
          return (
            (t.ɵmod = ae({ type: t })),
            (t.ɵinj = at({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[ed.forRoot(hd), ed.forRoot(hd, { useHash: !0 })], ed],
            })),
            t
          );
        })(),
        pd = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = re({
              type: t,
              selectors: [["app-menu"]],
              decls: 21,
              vars: 0,
              consts: [
                [
                  1,
                  "col-lg-7",
                  "col-md-8",
                  "col-sm-7",
                  "col-xs-5",
                  "menu-area",
                ],
                [1, "topbar"],
                [1, "menu"],
                [
                  "data-effect",
                  "",
                  1,
                  "primary",
                  "inviewport",
                  "animated",
                  "delay2",
                ],
                [1, "cssmenu"],
                [1, "menu-ul"],
                [1, "has-sub"],
                ["routerLink", "/home", 1, "menuStyle"],
                ["routerLink", "/nuestros-servicios", 1, "menuStyle"],
                ["routerLink", "/cotizacion", 1, "menuStyle"],
                ["routerLink", "/contacto", 1, "menuStyle"],
                [1, "menu-mobile", "col-xs-10", "pull-right", "cssmenu"],
                [1, "icon", "icon-menu", "menu-toggle"],
                ["id", "parallax-mobile-menu", 1, "menu"],
              ],
              template: function (t, e) {
                1 & t &&
                  (Xs(0, "div", 0),
                  Xs(1, "div", 1),
                  Xs(2, "div", 2),
                  Xs(3, "div", 3),
                  Xs(4, "div", 4),
                  Xs(5, "ul", 5),
                  Xs(6, "li", 6),
                  Xs(7, "a", 7),
                  io(8, "Inicio "),
                  to(),
                  to(),
                  Xs(9, "li", 6),
                  Xs(10, "a", 8),
                  io(11, "Nuestros Servicios "),
                  to(),
                  to(),
                  Xs(12, "li", 6),
                  Xs(13, "a", 9),
                  io(14, "Cotizaci\xf3n"),
                  to(),
                  to(),
                  Xs(15, "li", 6),
                  Xs(16, "a", 10),
                  io(17, "Contacto "),
                  to(),
                  to(),
                  to(),
                  to(),
                  to(),
                  to(),
                  to(),
                  Xs(18, "div", 11),
                  eo(19, "i", 12),
                  eo(20, "ul", 13),
                  to(),
                  to());
              },
              directives: [Vh],
              styles: [
                ".menuStyle[_ngcontent-%COMP%]{text-shadow:1px 1px 2px #000}@media (max-width:825px){*[_ngcontent-%COMP%]{font-size:50px!important;font-weight:500}}@media (max-width:991.98px){*[_ngcontent-%COMP%]{font-size:27px!important;font-weight:500}.title[_ngcontent-%COMP%]{font-weight:800}}",
              ],
            })),
            t
          );
        })(),
        fd = (() => {
          class t {
            constructor() {
              document.getElementById("testScript") &&
                document.getElementById("testScript").remove();
              let t = document.createElement("script");
              t.setAttribute("id", "testScript"),
                t.setAttribute("src", "assets/js/jquery.js"),
                document.body.appendChild(t);
            }
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = re({
              type: t,
              selectors: [["app-header"]],
              decls: 22,
              vars: 0,
              consts: [
                ["id", "header", 1, "header"],
                [1, "topbar-wrap"],
                [1, "container"],
                [
                  1,
                  "col-lg-2",
                  "col-md-2",
                  "col-sm-2",
                  "col-xs-2",
                  "logo-area",
                ],
                [1, "header-bg"],
                [
                  1,
                  "col-lg-3",
                  "col-md-3",
                  "col-sm-3",
                  "col-xs-3",
                  "hidden-xs",
                ],
                ["id", "header-slider", 1, "owl-carousel"],
                [
                  2,
                  "position",
                  "relative",
                  "display",
                  "inline-block",
                  "width",
                  "100%",
                  "height",
                  "auto",
                ],
                [
                  "src",
                  "//webeandositio.com/assets/img/banner-1.png",
                  "alt",
                  "Header Image",
                  1,
                  "img-responsive",
                  "owl-lazy",
                ],
                [
                  "src",
                  "//webeandositio.com/assets/img/banner-2.png",
                  "alt",
                  "Header Image",
                  1,
                  "img-responsive",
                  "owl-lazy",
                ],
                [
                  "src",
                  "//webeandositio.com/assets/img/banner-3.png",
                  "alt",
                  "Header Image",
                  1,
                  "img-responsive",
                  "owl-lazy",
                ],
                [
                  1,
                  "col-lg-6",
                  "col-md-6",
                  "col-sm-6",
                  "col-xs-6",
                  "social-wrap",
                  "hidden-xs",
                ],
                [1, "social-box"],
                [1, "social-icons-wrap"],
                [
                  "href",
                  "https://api.whatsapp.com/send?phone=541141711760&text=hola,%20\xbfc\xf3mo%20est\xe1s?%20quer\xeda%20consultarte: ",
                ],
                [
                  1,
                  "icon",
                  "fa",
                  "fa-whatsapp",
                  "text-on-primary",
                  2,
                  "font-size",
                  "23px",
                  "padding-top",
                  "2px",
                ],
              ],
              template: function (t, e) {
                1 & t &&
                  (Xs(0, "section", 0),
                  Xs(1, "div", 1),
                  Xs(2, "div", 2),
                  eo(3, "div", 3),
                  eo(4, "app-menu"),
                  to(),
                  to(),
                  Xs(5, "div", 4),
                  eo(6, "div", 5),
                  Xs(7, "div", 6),
                  Xs(8, "div", 7),
                  eo(9, "img", 8),
                  eo(10, "div"),
                  to(),
                  Xs(11, "div", 7),
                  eo(12, "img", 9),
                  eo(13, "div"),
                  to(),
                  Xs(14, "div", 7),
                  eo(15, "img", 10),
                  eo(16, "div"),
                  to(),
                  to(),
                  Xs(17, "div", 11),
                  Xs(18, "div", 12),
                  Xs(19, "div", 13),
                  Xs(20, "a", 14),
                  eo(21, "i", 15),
                  to(),
                  to(),
                  to(),
                  to(),
                  to(),
                  to());
              },
              directives: [pd],
              styles: [
                "@media (max-width:825px){*[_ngcontent-%COMP%]{font-size:50px!important;font-weight:500}}@media (max-width:991.98px){*[_ngcontent-%COMP%]{font-size:27px!important;font-weight:500}.title[_ngcontent-%COMP%]{font-weight:800}}",
              ],
            })),
            t
          );
        })(),
        gd = (() => {
          class t {
            constructor(t) {
              (this.info = t), (this.anio = new Date().getFullYear());
            }
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Js(Dl));
            }),
            (t.ɵcmp = re({
              type: t,
              selectors: [["app-footer"]],
              decls: 36,
              vars: 4,
              consts: [
                ["id", "footer", 1, "footer", "bg-black", "parallax"],
                [1, "bg-overlay"],
                [1, "container"],
                [1, "row"],
                [
                  "data-effect",
                  "fadeInUp",
                  1,
                  "col-lg-6",
                  "col-md-6",
                  "col-sm-12",
                  "col-xs-12",
                  "text-widget",
                  "inviewport",
                  "animated",
                  "delay1",
                ],
                [1, "logo"],
                [1, "name"],
                [
                  "data-effect",
                  "fadeInUp",
                  1,
                  "col-lg-6",
                  "col-md-6",
                  "col-sm-12",
                  "col-xs-12",
                  "contact-widget",
                  "inviewport",
                  "animated",
                  "delay3",
                ],
                [1, "headul", "left-align"],
                [
                  "href",
                  "https://api.whatsapp.com/send?phone=541141711760&text=hola,%20\xbfc\xf3mo%20est\xe1s?%20quer\xeda%20consultarte: ",
                  1,
                  "btn",
                  "btn-primary-outline",
                  2,
                  "background",
                  "green",
                  "color",
                  "white",
                ],
                [
                  1,
                  "fa",
                  "fa-whatsapp",
                  2,
                  "font-size",
                  "25px",
                  "margin-right",
                  "15px",
                ],
                [1, "copyright"],
                [1, "col-md-12"],
                [1, ""],
                [
                  "data-effect",
                  "fadeInUp",
                  1,
                  "col-lg-6",
                  "col-md-6",
                  "col-sm-6",
                  "col-xs-12",
                  "message",
                  "inviewport",
                  "animated",
                  "delay1",
                ],
                [1, "col-lg-6", "col-md-6", "col-sm-6", "col-xs-12", "social"],
                [
                  "href",
                  "https://api.whatsapp.com/send?phone=541141711760&text=hola,%20\xbfc\xf3mo%20est\xe1s?%20quer\xeda%20consultarte: ",
                ],
                [
                  1,
                  "icon",
                  "icon",
                  "fa",
                  "fa-whatsapp",
                  "text-on-primary",
                  2,
                  "font-size",
                  "23px",
                  "padding-top",
                  "20px",
                ],
              ],
              template: function (t, e) {
                1 & t &&
                  (Xs(0, "section", 0),
                  eo(1, "div", 1),
                  Xs(2, "div", 2),
                  Xs(3, "div", 3),
                  Xs(4, "div", 4),
                  Xs(5, "div", 5),
                  Xs(6, "span", 6),
                  io(7, "Transporte Nortruck"),
                  to(),
                  to(),
                  Xs(8, "p"),
                  io(
                    9,
                    "Transporte Nortruck SRL, es una empresa familiar que se inicia en el a\xf1o 2006 y que brinda servicios de transporte de carga por carretera. "
                  ),
                  to(),
                  Xs(10, "p"),
                  io(
                    11,
                    "Trabajamos para ser una soluci\xf3n para nuestros clientes, basados en la seguridad, calidad, econom\xeda, rapidez y eficiencia, ofreciendo un servicio personalizado a nuestros clientes, adapt\xe1ndonos a sus necesidades."
                  ),
                  to(),
                  to(),
                  Xs(12, "div", 7),
                  Xs(13, "h4"),
                  io(14, "Contacto"),
                  to(),
                  eo(15, "div", 8),
                  Xs(16, "p"),
                  io(17),
                  to(),
                  Xs(18, "p"),
                  io(19),
                  eo(20, "br"),
                  io(21),
                  to(),
                  Xs(22, "p"),
                  Xs(23, "a", 9),
                  eo(24, "i", 10),
                  io(25, "Click ac\xe1 para escribirnos por Whatsapp"),
                  to(),
                  to(),
                  to(),
                  to(),
                  to(),
                  Xs(26, "div", 11),
                  Xs(27, "div", 12),
                  Xs(28, "div", 2),
                  Xs(29, "div", 13),
                  Xs(30, "div", 14),
                  Xs(31, "span", 13),
                  io(32),
                  to(),
                  to(),
                  Xs(33, "div", 15),
                  Xs(34, "a", 16),
                  eo(35, "i", 17),
                  to(),
                  to(),
                  to(),
                  to(),
                  to(),
                  to(),
                  to()),
                  2 & t &&
                    (wr(17),
                    ao("Direcci\xf3n: ", e.info.datosPersonales.direccion, ""),
                    wr(2),
                    ao("Email: ", e.info.datosPersonales.email, " "),
                    wr(2),
                    ao(" Tel\xe9fono: ", e.info.datosPersonales.whatsapp, ""),
                    wr(11),
                    ao("\xa9 ", e.anio, " Transporte Nortruck"));
              },
              styles: [
                "@media (max-width:825px){*[_ngcontent-%COMP%]{font-size:50px!important;font-weight:500}}@media (max-width:991.98px){*[_ngcontent-%COMP%]{font-size:25px!important;font-weight:500}.title[_ngcontent-%COMP%]{font-weight:800}}",
              ],
            })),
            t
          );
        })(),
        md = (() => {
          class t {
            constructor() {
              this.title = "angularApp";
            }
            ngOnInit() {}
            refresh() {
              window.location.reload();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = re({
              type: t,
              selectors: [["app-root"]],
              decls: 3,
              vars: 0,
              template: function (t, e) {
                1 & t &&
                  (eo(0, "app-header"),
                  eo(1, "router-outlet"),
                  eo(2, "app-footer"));
              },
              directives: [fd, Bh, gd],
              styles: [""],
            })),
            t
          );
        })(),
        yd = (() => {
          class t {}
          return (
            (t.ɵmod = ae({ type: t, bootstrap: [md] })),
            (t.ɵinj = at({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [],
              imports: [[Ya, Ul, dd]],
            })),
            t
          );
        })();
      (function () {
        if (Qn)
          throw new Error("Cannot enable prod mode after platform setup.");
        Zn = !1;
      })(),
        Ka()
          .bootstrapModule(yd)
          .catch((t) => console.error(t));
    },
    zn8P: function (t, e) {
      function n(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "zn8P");
    },
  },
  [[0, 0]],
]);
