/*! For license information please see bundle.js.LICENSE.txt */
(() => {
  "use strict";
  const t = "w",
    e = "b",
    s = "p",
    i = "b",
    o = "r",
    r = "q",
    n = "k",
    h = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    a = -1,
    l = {
      NORMAL: "n",
      CAPTURE: "c",
      BIG_PAWN: "b",
      EP_CAPTURE: "e",
      PROMOTION: "p",
      KSIDE_CASTLE: "k",
      QSIDE_CASTLE: "q",
    },
    _ = {
      NORMAL: 1,
      CAPTURE: 2,
      BIG_PAWN: 4,
      EP_CAPTURE: 8,
      PROMOTION: 16,
      KSIDE_CASTLE: 32,
      QSIDE_CASTLE: 64,
    },
    c = {
      a8: 0,
      b8: 1,
      c8: 2,
      d8: 3,
      e8: 4,
      f8: 5,
      g8: 6,
      h8: 7,
      a7: 16,
      b7: 17,
      c7: 18,
      d7: 19,
      e7: 20,
      f7: 21,
      g7: 22,
      h7: 23,
      a6: 32,
      b6: 33,
      c6: 34,
      d6: 35,
      e6: 36,
      f6: 37,
      g6: 38,
      h6: 39,
      a5: 48,
      b5: 49,
      c5: 50,
      d5: 51,
      e5: 52,
      f5: 53,
      g5: 54,
      h5: 55,
      a4: 64,
      b4: 65,
      c4: 66,
      d4: 67,
      e4: 68,
      f4: 69,
      g4: 70,
      h4: 71,
      a3: 80,
      b3: 81,
      c3: 82,
      d3: 83,
      e3: 84,
      f3: 85,
      g3: 86,
      h3: 87,
      a2: 96,
      b2: 97,
      c2: 98,
      d2: 99,
      e2: 100,
      f2: 101,
      g2: 102,
      h2: 103,
      a1: 112,
      b1: 113,
      c1: 114,
      d1: 115,
      e1: 116,
      f1: 117,
      g1: 118,
      h1: 119,
    },
    u = { b: [16, 32, 17, 15], w: [-16, -32, -17, -15] },
    f = {
      n: [-18, -33, -31, -14, 18, 33, 31, 14],
      b: [-17, -15, 17, 15],
      r: [-16, 1, 16, -1],
      q: [-17, -16, -15, 1, 17, 16, 15, -1],
      k: [-17, -16, -15, 1, 17, 16, 15, -1],
    },
    d = [
      20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0, 0, 0, 0,
      24, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0,
      0, 0, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 20,
      0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0, 24, 24, 24,
      24, 24, 24, 56, 0, 56, 24, 24, 24, 24, 24, 24, 0, 0, 0, 0, 0, 0, 2, 53,
      56, 53, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0,
      0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0,
      20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0,
      0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20,
    ],
    p = [
      17, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 15, 0, 0, 17, 0, 0, 0, 0, 0,
      16, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 17, 0, 0, 0, 0, 16, 0, 0, 0, 0, 15, 0,
      0, 0, 0, 0, 0, 17, 0, 0, 0, 16, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 17,
      0, 0, 16, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 16, 0, 15, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 16, 15, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
      1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -15, -16,
      -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, -16, 0, -17, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, -15, 0, 0, -16, 0, 0, -17, 0, 0, 0, 0, 0, 0, 0, 0, -15,
      0, 0, 0, -16, 0, 0, 0, -17, 0, 0, 0, 0, 0, 0, -15, 0, 0, 0, 0, -16, 0, 0,
      0, 0, -17, 0, 0, 0, 0, -15, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, -17, 0, 0,
      -15, 0, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, 0, -17,
    ],
    g = { p: 1, n: 2, b: 4, r: 8, q: 16, k: 32 },
    m = ["n", i, o, r],
    b = { [n]: _.KSIDE_CASTLE, [r]: _.QSIDE_CASTLE },
    v = {
      w: [
        { square: c.a1, flag: _.QSIDE_CASTLE },
        { square: c.h1, flag: _.KSIDE_CASTLE },
      ],
      b: [
        { square: c.a8, flag: _.QSIDE_CASTLE },
        { square: c.h8, flag: _.KSIDE_CASTLE },
      ],
    },
    E = { b: 1, w: 6 },
    k = ["1-0", "0-1", "1/2-1/2", "*"];
  function S(t) {
    return t >> 4;
  }
  function C(t) {
    return 15 & t;
  }
  function A(t) {
    return -1 !== "0123456789".indexOf(t);
  }
  function I(t) {
    const e = C(t),
      s = S(t);
    return "abcdefgh".substring(e, e + 1) + "87654321".substring(s, s + 1);
  }
  function y(s) {
    return s === t ? e : t;
  }
  function w(t, e, i, o, r, n = void 0, h = _.NORMAL) {
    const a = S(o);
    if (r !== s || (7 !== a && 0 !== a))
      t.push({ color: e, from: i, to: o, piece: r, captured: n, flags: h });
    else
      for (let s = 0; s < m.length; s++) {
        const a = m[s];
        t.push({
          color: e,
          from: i,
          to: o,
          piece: r,
          captured: n,
          promotion: a,
          flags: h | _.PROMOTION,
        });
      }
  }
  function T(t) {
    let e = t.charAt(0);
    if (e >= "a" && e <= "h") {
      if (t.match(/[a-h]\d.*[a-h]\d/)) return;
      return s;
    }
    return (e = e.toLowerCase()), "o" === e ? n : e;
  }
  function N(t) {
    return t.replace(/=/, "").replace(/[+#]?[?!]*$/, "");
  }
  window.Chess = class {
    _board = new Array(128);
    _turn = t;
    _header = {};
    _kings = { w: a, b: a };
    _epSquare = -1;
    _halfMoves = 0;
    _moveNumber = 0;
    _history = [];
    _comments = {};
    _castling = { w: 0, b: 0 };
    constructor(t = h) {
      this.load(t);
    }
    clear(e = !1) {
      (this._board = new Array(128)),
        (this._kings = { w: a, b: a }),
        (this._turn = t),
        (this._castling = { w: 0, b: 0 }),
        (this._epSquare = a),
        (this._halfMoves = 0),
        (this._moveNumber = 1),
        (this._history = []),
        (this._comments = {}),
        (this._header = e ? this._header : {}),
        this._updateSetup(this.fen());
    }
    removeHeader(t) {
      t in this._header && delete this._header[t];
    }
    load(s, i = !1) {
      let o = s.split(/\s+/);
      if (o.length >= 2 && o.length < 6) {
        const t = ["-", "-", "0", "1"];
        s = o.concat(t.slice(-(6 - o.length))).join(" ");
      }
      o = s.split(/\s+/);
      const { ok: r, error: n } = (function (t) {
        const e = t.split(/\s+/);
        if (6 !== e.length)
          return {
            ok: !1,
            error: "Invalid FEN: must contain six space-delimited fields",
          };
        const s = parseInt(e[5], 10);
        if (isNaN(s) || s <= 0)
          return {
            ok: !1,
            error: "Invalid FEN: move number must be a positive integer",
          };
        const i = parseInt(e[4], 10);
        if (isNaN(i) || i < 0)
          return {
            ok: !1,
            error:
              "Invalid FEN: half move counter number must be a non-negative integer",
          };
        if (!/^(-|[abcdefgh][36])$/.test(e[3]))
          return { ok: !1, error: "Invalid FEN: en-passant square is invalid" };
        if (/[^kKqQ-]/.test(e[2]))
          return {
            ok: !1,
            error: "Invalid FEN: castling availability is invalid",
          };
        if (!/^(w|b)$/.test(e[1]))
          return { ok: !1, error: "Invalid FEN: side-to-move is invalid" };
        const o = e[0].split("/");
        if (8 !== o.length)
          return {
            ok: !1,
            error:
              "Invalid FEN: piece data does not contain 8 '/'-delimited rows",
          };
        for (let t = 0; t < o.length; t++) {
          let e = 0,
            s = !1;
          for (let i = 0; i < o[t].length; i++)
            if (A(o[t][i])) {
              if (s)
                return {
                  ok: !1,
                  error:
                    "Invalid FEN: piece data is invalid (consecutive number)",
                };
              (e += parseInt(o[t][i], 10)), (s = !0);
            } else {
              if (!/^[prnbqkPRNBQK]$/.test(o[t][i]))
                return {
                  ok: !1,
                  error: "Invalid FEN: piece data is invalid (invalid piece)",
                };
              (e += 1), (s = !1);
            }
          if (8 !== e)
            return {
              ok: !1,
              error:
                "Invalid FEN: piece data is invalid (too many squares in rank)",
            };
        }
        if (("3" == e[3][1] && "w" == e[1]) || ("6" == e[3][1] && "b" == e[1]))
          return { ok: !1, error: "Invalid FEN: illegal en-passant square" };
        const r = [
          { color: "white", regex: /K/g },
          { color: "black", regex: /k/g },
        ];
        for (const { color: t, regex: s } of r) {
          if (!s.test(e[0]))
            return { ok: !1, error: `Invalid FEN: missing ${t} king` };
          if ((e[0].match(s) || []).length > 1)
            return { ok: !1, error: `Invalid FEN: too many ${t} kings` };
        }
        return { ok: !0 };
      })(s);
      if (!r) throw new Error(n);
      const h = o[0];
      let l = 0;
      this.clear(i);
      for (let s = 0; s < h.length; s++) {
        const i = h.charAt(s);
        if ("/" === i) l += 8;
        else if (A(i)) l += parseInt(i, 10);
        else {
          const s = i < "a" ? t : e;
          this.put({ type: i.toLowerCase(), color: s }, I(l)), l++;
        }
      }
      (this._turn = o[1]),
        o[2].indexOf("K") > -1 && (this._castling.w |= _.KSIDE_CASTLE),
        o[2].indexOf("Q") > -1 && (this._castling.w |= _.QSIDE_CASTLE),
        o[2].indexOf("k") > -1 && (this._castling.b |= _.KSIDE_CASTLE),
        o[2].indexOf("q") > -1 && (this._castling.b |= _.QSIDE_CASTLE),
        (this._epSquare = "-" === o[3] ? a : c[o[3]]),
        (this._halfMoves = parseInt(o[4], 10)),
        (this._moveNumber = parseInt(o[5], 10)),
        this._updateSetup(this.fen());
    }
    fen() {
      let i = 0,
        o = "";
      for (let e = c.a8; e <= c.h1; e++) {
        if (this._board[e]) {
          i > 0 && ((o += i), (i = 0));
          const { color: s, type: r } = this._board[e];
          o += s === t ? r.toUpperCase() : r.toLowerCase();
        } else i++;
        (e + 1) & 136 &&
          (i > 0 && (o += i), e !== c.h1 && (o += "/"), (i = 0), (e += 8));
      }
      let r = "";
      this._castling[t] & _.KSIDE_CASTLE && (r += "K"),
        this._castling[t] & _.QSIDE_CASTLE && (r += "Q"),
        this._castling[e] & _.KSIDE_CASTLE && (r += "k"),
        this._castling[e] & _.QSIDE_CASTLE && (r += "q"),
        (r = r || "-");
      let n = "-";
      if (this._epSquare !== a) {
        const e = this._epSquare + (this._turn === t ? 16 : -16),
          i = [e + 1, e - 1];
        for (const t of i) {
          if (136 & t) continue;
          const e = this._turn;
          if (this._board[t]?.color === e && this._board[t]?.type === s) {
            this._makeMove({
              color: e,
              from: t,
              to: this._epSquare,
              piece: s,
              captured: s,
              flags: _.EP_CAPTURE,
            });
            const i = !this._isKingAttacked(e);
            if ((this._undoMove(), i)) {
              n = I(this._epSquare);
              break;
            }
          }
        }
      }
      return [o, this._turn, r, n, this._halfMoves, this._moveNumber].join(" ");
    }
    _updateSetup(t) {
      this._history.length > 0 ||
        (t !== h
          ? ((this._header.SetUp = "1"), (this._header.FEN = t))
          : (delete this._header.SetUp, delete this._header.FEN));
    }
    reset() {
      this.load(h);
    }
    get(t) {
      return this._board[c[t]] || !1;
    }
    put({ type: t, color: e }, s) {
      if (-1 === "pnbrqkPNBRQK".indexOf(t.toLowerCase())) return !1;
      if (!(s in c)) return !1;
      const i = c[s];
      return (
        (t != n || this._kings[e] == a || this._kings[e] == i) &&
        ((this._board[i] = { type: t, color: e }),
        t === n && (this._kings[e] = i),
        this._updateCastlingRights(),
        this._updateEnPassantSquare(),
        this._updateSetup(this.fen()),
        !0)
      );
    }
    remove(t) {
      const e = this.get(t);
      return (
        delete this._board[c[t]],
        e && e.type === n && (this._kings[e.color] = a),
        this._updateCastlingRights(),
        this._updateEnPassantSquare(),
        this._updateSetup(this.fen()),
        e
      );
    }
    _updateCastlingRights() {
      const s = this._board[c.e1]?.type === n && this._board[c.e1]?.color === t,
        i = this._board[c.e8]?.type === n && this._board[c.e8]?.color === e;
      (s && this._board[c.a1]?.type === o && this._board[c.a1]?.color === t) ||
        (this._castling.w &= ~_.QSIDE_CASTLE),
        (s &&
          this._board[c.h1]?.type === o &&
          this._board[c.h1]?.color === t) ||
          (this._castling.w &= ~_.KSIDE_CASTLE),
        (i &&
          this._board[c.a8]?.type === o &&
          this._board[c.a8]?.color === e) ||
          (this._castling.b &= ~_.QSIDE_CASTLE),
        (i &&
          this._board[c.h8]?.type === o &&
          this._board[c.h8]?.color === e) ||
          (this._castling.b &= ~_.KSIDE_CASTLE);
    }
    _updateEnPassantSquare() {
      if (this._epSquare === a) return;
      const e = this._epSquare + (this._turn === t ? -16 : 16),
        i = this._epSquare + (this._turn === t ? 16 : -16),
        o = [i + 1, i - 1];
      (null === this._board[e] &&
        null === this._board[this._epSquare] &&
        this._board[i]?.color === y(this._turn) &&
        this._board[i]?.type === s &&
        o.some(
          (t) =>
            !(136 & t) &&
            this._board[t]?.color === this._turn &&
            this._board[t]?.type === s
        )) ||
        (this._epSquare = a);
    }
    _attacked(i, o) {
      for (let r = c.a8; r <= c.h1; r++) {
        if (136 & r) {
          r += 7;
          continue;
        }
        if (void 0 === this._board[r] || this._board[r].color !== i) continue;
        const n = this._board[r],
          h = r - o;
        if (0 === h) continue;
        const a = h + 119;
        if (d[a] & g[n.type]) {
          if (n.type === s) {
            if (h > 0) {
              if (n.color === t) return !0;
            } else if (n.color === e) return !0;
            continue;
          }
          if ("n" === n.type || "k" === n.type) return !0;
          const i = p[a];
          let l = r + i,
            _ = !1;
          for (; l !== o; ) {
            if (null != this._board[l]) {
              _ = !0;
              break;
            }
            l += i;
          }
          if (!_) return !0;
        }
      }
      return !1;
    }
    _isKingAttacked(t) {
      const e = this._kings[t];
      return -1 !== e && this._attacked(y(t), e);
    }
    isAttacked(t, e) {
      return this._attacked(e, c[t]);
    }
    isCheck() {
      return this._isKingAttacked(this._turn);
    }
    inCheck() {
      return this.isCheck();
    }
    isCheckmate() {
      return this.isCheck() && 0 === this._moves().length;
    }
    isStalemate() {
      return !this.isCheck() && 0 === this._moves().length;
    }
    isInsufficientMaterial() {
      const t = { b: 0, n: 0, r: 0, q: 0, k: 0, p: 0 },
        e = [];
      let s = 0,
        o = 0;
      for (let r = c.a8; r <= c.h1; r++) {
        if (((o = (o + 1) % 2), 136 & r)) {
          r += 7;
          continue;
        }
        const n = this._board[r];
        n &&
          ((t[n.type] = n.type in t ? t[n.type] + 1 : 1),
          n.type === i && e.push(o),
          s++);
      }
      if (2 === s) return !0;
      if (3 === s && (1 === t[i] || 1 === t.n)) return !0;
      if (s === t[i] + 2) {
        let t = 0;
        const s = e.length;
        for (let i = 0; i < s; i++) t += e[i];
        if (0 === t || t === s) return !0;
      }
      return !1;
    }
    isThreefoldRepetition() {
      const t = [],
        e = {};
      let s = !1;
      for (;;) {
        const e = this._undoMove();
        if (!e) break;
        t.push(e);
      }
      for (;;) {
        const i = this.fen().split(" ").slice(0, 4).join(" ");
        (e[i] = i in e ? e[i] + 1 : 1), e[i] >= 3 && (s = !0);
        const o = t.pop();
        if (!o) break;
        this._makeMove(o);
      }
      return s;
    }
    isDraw() {
      return (
        this._halfMoves >= 100 ||
        this.isStalemate() ||
        this.isInsufficientMaterial() ||
        this.isThreefoldRepetition()
      );
    }
    isGameOver() {
      return this.isCheckmate() || this.isStalemate() || this.isDraw();
    }
    moves({ verbose: t = !1, square: e, piece: s } = {}) {
      const i = this._moves({ square: e, piece: s });
      return t
        ? i.map((t) => this._makePretty(t))
        : i.map((t) => this._moveToSan(t, i));
    }
    _moves({ legal: t = !0, piece: e, square: i } = {}) {
      const o = i ? i.toLowerCase() : void 0,
        r = e?.toLowerCase(),
        h = [],
        a = this._turn,
        l = y(a);
      let d = c.a8,
        p = c.h1,
        g = !1;
      if (o) {
        if (!(o in c)) return [];
        (d = p = c[o]), (g = !0);
      }
      for (let t = d; t <= p; t++) {
        if (136 & t) {
          t += 7;
          continue;
        }
        if (!this._board[t] || this._board[t].color === l) continue;
        const { type: e } = this._board[t];
        let i;
        if (e === s) {
          if (r && r !== e) continue;
          (i = t + u[a][0]),
            this._board[i] ||
              (w(h, a, t, i, s),
              (i = t + u[a][1]),
              E[a] !== S(t) ||
                this._board[i] ||
                w(h, a, t, i, s, void 0, _.BIG_PAWN));
          for (let e = 2; e < 4; e++)
            (i = t + u[a][e]),
              136 & i ||
                (this._board[i]?.color === l
                  ? w(h, a, t, i, s, this._board[i].type, _.CAPTURE)
                  : i === this._epSquare && w(h, a, t, i, s, s, _.EP_CAPTURE));
        } else {
          if (r && r !== e) continue;
          for (let s = 0, o = f[e].length; s < o; s++) {
            const o = f[e][s];
            for (i = t; (i += o), !(136 & i); ) {
              if (this._board[i]) {
                if (this._board[i].color === a) break;
                w(h, a, t, i, e, this._board[i].type, _.CAPTURE);
                break;
              }
              if ((w(h, a, t, i, e), "n" === e || e === n)) break;
            }
          }
        }
      }
      if (!((void 0 !== r && r !== n) || (g && p !== this._kings[a]))) {
        if (this._castling[a] & _.KSIDE_CASTLE) {
          const t = this._kings[a],
            e = t + 2;
          this._board[t + 1] ||
            this._board[e] ||
            this._attacked(l, this._kings[a]) ||
            this._attacked(l, t + 1) ||
            this._attacked(l, e) ||
            w(h, a, this._kings[a], e, n, void 0, _.KSIDE_CASTLE);
        }
        if (this._castling[a] & _.QSIDE_CASTLE) {
          const t = this._kings[a],
            e = t - 2;
          this._board[t - 1] ||
            this._board[t - 2] ||
            this._board[t - 3] ||
            this._attacked(l, this._kings[a]) ||
            this._attacked(l, t - 1) ||
            this._attacked(l, e) ||
            w(h, a, this._kings[a], e, n, void 0, _.QSIDE_CASTLE);
        }
      }
      if (!t || -1 === this._kings[a]) return h;
      const m = [];
      for (let t = 0, e = h.length; t < e; t++)
        this._makeMove(h[t]),
          this._isKingAttacked(a) || m.push(h[t]),
          this._undoMove();
      return m;
    }
    move(t, { strict: e = !1 } = {}) {
      let s = null;
      if ("string" == typeof t) s = this._moveFromSan(t, e);
      else if ("object" == typeof t) {
        const e = this._moves();
        for (let i = 0, o = e.length; i < o; i++)
          if (
            t.from === I(e[i].from) &&
            t.to === I(e[i].to) &&
            (!("promotion" in e[i]) || t.promotion === e[i].promotion)
          ) {
            s = e[i];
            break;
          }
      }
      if (!s)
        throw "string" == typeof t
          ? new Error(`Invalid move: ${t}`)
          : new Error(`Invalid move: ${JSON.stringify(t)}`);
      const i = this._makePretty(s);
      return this._makeMove(s), i;
    }
    _push(t) {
      this._history.push({
        move: t,
        kings: { b: this._kings.b, w: this._kings.w },
        turn: this._turn,
        castling: { b: this._castling.b, w: this._castling.w },
        epSquare: this._epSquare,
        halfMoves: this._halfMoves,
        moveNumber: this._moveNumber,
      });
    }
    _makeMove(t) {
      const i = this._turn,
        o = y(i);
      if (
        (this._push(t),
        (this._board[t.to] = this._board[t.from]),
        delete this._board[t.from],
        t.flags & _.EP_CAPTURE &&
          (this._turn === e
            ? delete this._board[t.to - 16]
            : delete this._board[t.to + 16]),
        t.promotion && (this._board[t.to] = { type: t.promotion, color: i }),
        this._board[t.to].type === n)
      ) {
        if (((this._kings[i] = t.to), t.flags & _.KSIDE_CASTLE)) {
          const e = t.to - 1,
            s = t.to + 1;
          (this._board[e] = this._board[s]), delete this._board[s];
        } else if (t.flags & _.QSIDE_CASTLE) {
          const e = t.to + 1,
            s = t.to - 2;
          (this._board[e] = this._board[s]), delete this._board[s];
        }
        this._castling[i] = 0;
      }
      if (this._castling[i])
        for (let e = 0, s = v[i].length; e < s; e++)
          if (t.from === v[i][e].square && this._castling[i] & v[i][e].flag) {
            this._castling[i] ^= v[i][e].flag;
            break;
          }
      if (this._castling[o])
        for (let e = 0, s = v[o].length; e < s; e++)
          if (t.to === v[o][e].square && this._castling[o] & v[o][e].flag) {
            this._castling[o] ^= v[o][e].flag;
            break;
          }
      t.flags & _.BIG_PAWN
        ? (this._epSquare = i === e ? t.to - 16 : t.to + 16)
        : (this._epSquare = a),
        t.piece === s || t.flags & (_.CAPTURE | _.EP_CAPTURE)
          ? (this._halfMoves = 0)
          : this._halfMoves++,
        i === e && this._moveNumber++,
        (this._turn = o);
    }
    undo() {
      const t = this._undoMove();
      return t ? this._makePretty(t) : null;
    }
    _undoMove() {
      const t = this._history.pop();
      if (void 0 === t) return null;
      const i = t.move;
      (this._kings = t.kings),
        (this._turn = t.turn),
        (this._castling = t.castling),
        (this._epSquare = t.epSquare),
        (this._halfMoves = t.halfMoves),
        (this._moveNumber = t.moveNumber);
      const o = this._turn,
        r = y(o);
      if (
        ((this._board[i.from] = this._board[i.to]),
        (this._board[i.from].type = i.piece),
        delete this._board[i.to],
        i.captured)
      )
        if (i.flags & _.EP_CAPTURE) {
          let t;
          (t = o === e ? i.to - 16 : i.to + 16),
            (this._board[t] = { type: s, color: r });
        } else this._board[i.to] = { type: i.captured, color: r };
      if (i.flags & (_.KSIDE_CASTLE | _.QSIDE_CASTLE)) {
        let t, e;
        i.flags & _.KSIDE_CASTLE
          ? ((t = i.to + 1), (e = i.to - 1))
          : ((t = i.to - 2), (e = i.to + 1)),
          (this._board[t] = this._board[e]),
          delete this._board[e];
      }
      return i;
    }
    pgn({ newline: t = "\n", maxWidth: e = 0 } = {}) {
      const s = [];
      let i = !1;
      for (const e in this._header)
        s.push("[" + e + ' "' + this._header[e] + '"]' + t), (i = !0);
      i && this._history.length && s.push(t);
      const o = (t) => {
          const e = this._comments[this.fen()];
          return (
            void 0 !== e && (t = `${t}${t.length > 0 ? " " : ""}{${e}}`), t
          );
        },
        r = [];
      for (; this._history.length > 0; ) r.push(this._undoMove());
      const n = [];
      let h = "";
      for (0 === r.length && n.push(o("")); r.length > 0; ) {
        h = o(h);
        const t = r.pop();
        if (!t) break;
        if (this._history.length || "b" !== t.color)
          "w" === t.color &&
            (h.length && n.push(h), (h = this._moveNumber + "."));
        else {
          const t = `${this._moveNumber}. ...`;
          h = h ? `${h} ${t}` : t;
        }
        (h = h + " " + this._moveToSan(t, this._moves({ legal: !0 }))),
          this._makeMove(t);
      }
      if (
        (h.length && n.push(o(h)),
        void 0 !== this._header.Result && n.push(this._header.Result),
        0 === e)
      )
        return s.join("") + n.join(" ");
      const a = function () {
          return s.length > 0 && " " === s[s.length - 1] && (s.pop(), !0);
        },
        l = function (i, o) {
          for (const r of o.split(" "))
            if (r) {
              if (i + r.length > e) {
                for (; a(); ) i--;
                s.push(t), (i = 0);
              }
              s.push(r), (i += r.length), s.push(" "), i++;
            }
          return a() && i--, i;
        };
      let _ = 0;
      for (let i = 0; i < n.length; i++)
        _ + n[i].length > e && n[i].includes("{")
          ? (_ = l(_, n[i]))
          : (_ + n[i].length > e && 0 !== i
              ? (" " === s[s.length - 1] && s.pop(), s.push(t), (_ = 0))
              : 0 !== i && (s.push(" "), _++),
            s.push(n[i]),
            (_ += n[i].length));
      return s.join("");
    }
    header(...t) {
      for (let e = 0; e < t.length; e += 2)
        "string" == typeof t[e] &&
          "string" == typeof t[e + 1] &&
          (this._header[t[e]] = t[e + 1]);
      return this._header;
    }
    loadPgn(t, { strict: e = !1, newlineChar: s = "\r?\n" } = {}) {
      function i(t) {
        return t.replace(/\\/g, "\\");
      }
      t = t.trim();
      const o = new RegExp(
          "^(\\[((?:" +
            i(s) +
            ")|.)*\\])((?:\\s*" +
            i(s) +
            "){2}|(?:\\s*" +
            i(s) +
            ")*$)"
        ).exec(t),
        r = o && o.length >= 2 ? o[1] : "";
      this.reset();
      const n = (function (t) {
        const e = {},
          o = t.split(new RegExp(i(s)));
        let r = "",
          n = "";
        for (let t = 0; t < o.length; t++) {
          const s = /^\s*\[\s*([A-Za-z]+)\s*"(.*)"\s*\]\s*$/;
          (r = o[t].replace(s, "$1")),
            (n = o[t].replace(s, "$2")),
            r.trim().length > 0 && (e[r] = n);
        }
        return e;
      })(r);
      let h = "";
      for (const t in n)
        "fen" === t.toLowerCase() && (h = n[t]), this.header(t, n[t]);
      if (e) {
        if ("1" === n.SetUp) {
          if (!("FEN" in n))
            throw new Error(
              "Invalid PGN: FEN tag must be supplied with SetUp tag"
            );
          this.load(n.FEN, !0);
        }
      } else h && this.load(h, !0);
      const a = function (t) {
          return `{${(function (t) {
            return Array.from(t)
              .map(function (t) {
                return t.charCodeAt(0) < 128
                  ? t.charCodeAt(0).toString(16)
                  : encodeURIComponent(t).replace(/%/g, "").toLowerCase();
              })
              .join("");
          })(
            (t = t.replace(new RegExp(i(s), "g"), " ")).slice(1, t.length - 1)
          )}}`;
        },
        l = function (t) {
          if (t.startsWith("{") && t.endsWith("}"))
            return (function (t) {
              return 0 == t.length
                ? ""
                : decodeURIComponent(
                    "%" + (t.match(/.{1,2}/g) || []).join("%")
                  );
            })(t.slice(1, t.length - 1));
        };
      let _ = t
        .replace(r, "")
        .replace(
          new RegExp(`({[^}]*})+?|;([^${i(s)}]*)`, "g"),
          function (t, e, s) {
            return void 0 !== e ? a(e) : " " + a(`{${s.slice(1)}}`);
          }
        )
        .replace(new RegExp(i(s), "g"), " ");
      const c = /(\([^()]+\))+?/g;
      for (; c.test(_); ) _ = _.replace(c, "");
      (_ = _.replace(/\d+\.(\.\.)?/g, "")),
        (_ = _.replace(/\.\.\./g, "")),
        (_ = _.replace(/\$\d+/g, ""));
      let u = _.trim().split(new RegExp(/\s+/));
      u = u.filter((t) => "" !== t);
      let f = "";
      for (let t = 0; t < u.length; t++) {
        const s = l(u[t]);
        if (void 0 !== s) {
          this._comments[this.fen()] = s;
          continue;
        }
        const i = this._moveFromSan(u[t], e);
        if (null == i) {
          if (!(k.indexOf(u[t]) > -1))
            throw new Error(`Invalid move in PGN: ${u[t]}`);
          f = u[t];
        } else (f = ""), this._makeMove(i);
      }
      f &&
        Object.keys(this._header).length &&
        !this._header.Result &&
        this.header("Result", f);
    }
    _moveToSan(t, e) {
      let i = "";
      if (t.flags & _.KSIDE_CASTLE) i = "O-O";
      else if (t.flags & _.QSIDE_CASTLE) i = "O-O-O";
      else {
        if (t.piece !== s) {
          const s = (function (t, e) {
            const s = t.from,
              i = t.to,
              o = t.piece;
            let r = 0,
              n = 0,
              h = 0;
            for (let t = 0, a = e.length; t < a; t++) {
              const a = e[t].from,
                l = e[t].to;
              o === e[t].piece &&
                s !== a &&
                i === l &&
                (r++, S(s) === S(a) && n++, C(s) === C(a) && h++);
            }
            return r > 0
              ? n > 0 && h > 0
                ? I(s)
                : h > 0
                ? I(s).charAt(1)
                : I(s).charAt(0)
              : "";
          })(t, e);
          i += t.piece.toUpperCase() + s;
        }
        t.flags & (_.CAPTURE | _.EP_CAPTURE) &&
          (t.piece === s && (i += I(t.from)[0]), (i += "x")),
          (i += I(t.to)),
          t.promotion && (i += "=" + t.promotion.toUpperCase());
      }
      return (
        this._makeMove(t),
        this.isCheck() && (this.isCheckmate() ? (i += "#") : (i += "+")),
        this._undoMove(),
        i
      );
    }
    _moveFromSan(t, e = !1) {
      const s = N(t);
      let i,
        o,
        r,
        n,
        h,
        a = T(s),
        l = this._moves({ legal: !0, piece: a });
      for (let t = 0, e = l.length; t < e; t++)
        if (s === N(this._moveToSan(l[t], l))) return l[t];
      if (e) return null;
      let _ = !1;
      if (
        ((o = s.match(
          /([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/
        )),
        o
          ? ((i = o[1]),
            (r = o[2]),
            (n = o[3]),
            (h = o[4]),
            1 == r.length && (_ = !0))
          : ((o = s.match(
              /([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/
            )),
            o &&
              ((i = o[1]),
              (r = o[2]),
              (n = o[3]),
              (h = o[4]),
              1 == r.length && (_ = !0))),
        (a = T(s)),
        (l = this._moves({ legal: !0, piece: i || a })),
        !n)
      )
        return null;
      for (let t = 0, e = l.length; t < e; t++)
        if (r) {
          if (
            !(
              (i && i.toLowerCase() != l[t].piece) ||
              c[r] != l[t].from ||
              c[n] != l[t].to ||
              (h && h.toLowerCase() != l[t].promotion)
            )
          )
            return l[t];
          if (_) {
            const e = I(l[t].from);
            if (
              !(
                (i && i.toLowerCase() != l[t].piece) ||
                c[n] != l[t].to ||
                (r != e[0] && r != e[1]) ||
                (h && h.toLowerCase() != l[t].promotion)
              )
            )
              return l[t];
          }
        } else if (s === N(this._moveToSan(l[t], l)).replace("x", ""))
          return l[t];
      return null;
    }
    ascii() {
      let e = "   +------------------------+\n";
      for (let s = c.a8; s <= c.h1; s++) {
        if (
          (0 === C(s) && (e += " " + "87654321"[S(s)] + " |"), this._board[s])
        ) {
          const i = this._board[s].type;
          e +=
            " " +
            (this._board[s].color === t ? i.toUpperCase() : i.toLowerCase()) +
            " ";
        } else e += " . ";
        (s + 1) & 136 && ((e += "|\n"), (s += 8));
      }
      return (
        (e += "   +------------------------+\n"),
        (e += "     a  b  c  d  e  f  g  h"),
        e
      );
    }
    perft(t) {
      const e = this._moves({ legal: !1 });
      let s = 0;
      const i = this._turn;
      for (let o = 0, r = e.length; o < r; o++)
        this._makeMove(e[o]),
          this._isKingAttacked(i) ||
            (t - 1 > 0 ? (s += this.perft(t - 1)) : s++),
          this._undoMove();
      return s;
    }
    _makePretty(t) {
      const {
        color: e,
        piece: s,
        from: i,
        to: o,
        flags: r,
        captured: n,
        promotion: h,
      } = t;
      let a = "";
      for (const t in _) _[t] & r && (a += l[t]);
      const c = I(i),
        u = I(o),
        f = {
          color: e,
          piece: s,
          from: c,
          to: u,
          san: this._moveToSan(t, this._moves({ legal: !0 })),
          flags: a,
          lan: c + u,
          before: this.fen(),
          after: "",
        };
      return (
        this._makeMove(t),
        (f.after = this.fen()),
        this._undoMove(),
        n && (f.captured = n),
        h && ((f.promotion = h), (f.lan += h)),
        f
      );
    }
    turn() {
      return this._turn;
    }
    board() {
      const t = [];
      let e = [];
      for (let s = c.a8; s <= c.h1; s++)
        null == this._board[s]
          ? e.push(null)
          : e.push({
              square: I(s),
              type: this._board[s].type,
              color: this._board[s].color,
            }),
          (s + 1) & 136 && (t.push(e), (e = []), (s += 8));
      return t;
    }
    squareColor(t) {
      if (t in c) {
        const e = c[t];
        return (S(e) + C(e)) % 2 == 0 ? "light" : "dark";
      }
      return null;
    }
    history({ verbose: t = !1 } = {}) {
      const e = [],
        s = [];
      for (; this._history.length > 0; ) e.push(this._undoMove());
      for (;;) {
        const i = e.pop();
        if (!i) break;
        t
          ? s.push(this._makePretty(i))
          : s.push(this._moveToSan(i, this._moves())),
          this._makeMove(i);
      }
      return s;
    }
    _pruneComments() {
      const t = [],
        e = {},
        s = (t) => {
          t in this._comments && (e[t] = this._comments[t]);
        };
      for (; this._history.length > 0; ) t.push(this._undoMove());
      for (s(this.fen()); ; ) {
        const e = t.pop();
        if (!e) break;
        this._makeMove(e), s(this.fen());
      }
      this._comments = e;
    }
    getComment() {
      return this._comments[this.fen()];
    }
    setComment(t) {
      this._comments[this.fen()] = t.replace("{", "[").replace("}", "]");
    }
    deleteComment() {
      const t = this._comments[this.fen()];
      return delete this._comments[this.fen()], t;
    }
    getComments() {
      return (
        this._pruneComments(),
        Object.keys(this._comments).map((t) => ({
          fen: t,
          comment: this._comments[t],
        }))
      );
    }
    deleteComments() {
      return (
        this._pruneComments(),
        Object.keys(this._comments).map((t) => {
          const e = this._comments[t];
          return delete this._comments[t], { fen: t, comment: e };
        })
      );
    }
    setCastlingRights(t, e) {
      for (const s of [n, r])
        void 0 !== e[s] &&
          (e[s] ? (this._castling[t] |= b[s]) : (this._castling[t] &= ~b[s]));
      this._updateCastlingRights();
      const s = this.getCastlingRights(t);
      return !(
        (void 0 !== e[n] && e[n] !== s[n]) ||
        (void 0 !== e[r] && e[r] !== s[r])
      );
    }
    getCastlingRights(t) {
      return {
        [n]: 0 != (this._castling[t] & b[n]),
        [r]: 0 != (this._castling[t] & b[r]),
      };
    }
    moveNumber() {
      return this._moveNumber;
    }
  };
})();
