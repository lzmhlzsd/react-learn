(function($) {

    var tpl = '<b>0<br />1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9</b>';

    $.MoneyJump = function(el, el_sub, mask, n, rem) {
        var p = parse_int(n),
            s = "",
            mlist = [],
            h = rem * 6;
        f4(p, el);
        el_sub.html(sub(n));

        for (var i = 0; i < p.length; i++) {
            var c = p[i];
            var np = (c == ',') ? $('<b>,</b>') : $(tpl);
            mask.append(np);
            mlist.push(np);
            if (c != ',') {
                np.offset({ 'top': 0 - h * c });
            }
        }

        var obj = {
            'el': $(el[0]),
            'sub_el': $(el_sub[0]),
            'mask': $(mask[0]),
            'mlist': mlist,
            'h': h
        }
        obj.to = f3.bind(obj);
        obj.mask.hide();
        return obj;
    }

    var sub = function(n) {
        return (n - Math.floor(n)).toFixed(2).substr(1);
    }

    var parse_int = function(i) {
        i = Math.floor(i);
        var p = [],
            j = 0;
        while (i > 0) {
            if (j % 3 == 0 && j != 0) {
                p.push(',');
            }
            p.push(i % 10);
            i = Math.floor(i / 10);
            j++;
        }
        return p
    }

    var f3 = function(n) {
        var p = parse_int(n),
            s = '',
            dur = 500,
            len = this.mlist.length;
        i = 0;

        this.mask.show();
        this.el.hide();

        f4(p, this.el);

        setTimeout(function() {
            this.sub_el.html(sub(n));
            this.el.show();
            this.mask.hide();
        }.bind(this), dur);

        for (i = 0; i < p.length; i++) {
            var c = p[i];
            if (i >= len) {
                var np = (c == ',') ? $('<b>,</b>') : $(tpl);
                this.mask.append(np);
                this.mlist.push(np);
                if (c != ',') {
                    np.offset({ 'top': 0 - this.h * 10 }).animate({ 'top': 0 - this.h * c }, dur);
                } else {
                    np.offset({ 'top': 0 - this.h * 2 }).animate({ 'top': 0 }, dur);
                }
            } else {
                if (c == ',') {
                    c = 0;
                }
                this.mlist[i].animate({ 'top': 0 - this.h * c }, dur);
            }
        }
        for (; i < len; i++) {
            if (this.mlist[i].text() == ',') {
                this.mlist[i].animate({ 'top': 0 - this.h * 2 }, dur);
            } else {
                this.mlist[i].animate({ 'top': 0 - this.h * 10 }, dur);
            }
        }
    }

    var f4 = function(p, el) {
        var s = "";
        for (var i = p.length; i > 0; i--) {
            var c = p[i - 1];
            s += c.toString();
        }
        el.html(s);
    }
})($);
