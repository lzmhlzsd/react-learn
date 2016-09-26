/**
 * Created by shopex on 16/6/16.
 */


/*
 <div class="b-item"></div>
 .b-item{ font-size: 可配置; color: #ff838e; position: absolute; right: 可配置; top: 0;z-index: 999;}
*/

window.barrage_counter = 0;
window.barrage = {
    init: function(option) {
        window.barrage.option = option;
        barrage.way = [];
        for (var i = option.h_area[0]; i < option.h_area[1] - option.font_size; i += option.font_size) {
            barrage.way.push(i);
        }
        barrage.way = barrage.shuffle(barrage.way);
    },
    run: function(box, records, tmpl) {
        $(records).each(function(i, record) {
            var text = barrage.text(tmpl, record);
            var el = $('<div class="b-item"></div>').html(text).css('visibility', 'hidden');
            el.appendTo(box);
            el.css({
                'font-size': (Math.random() * 0.5 + 0.5) * barrage.option.font_size,
                'color': 'rgb(' + barrage.hslToRgb(barrage.setHsl()).join(',') + ')',
                'top': barrage.way[window.barrage_counter % barrage.way.length],
                'right': 0 - el.width()
            });
            var move = function() {
                this.css('visibility', 'visible');
                this.animate({ right: $(window).width() + this.width() },
                    barrage.random(barrage.option.minSpeed, barrage.option.maxSpeed) * 1000, 'linear',
                    function() {
                        this.remove()
                    });
            }.bind(el);
            setTimeout(move, 2 * 1000 * i / records.length);
            window.barrage_counter++;
        });
    },
    text: function(tmpl, record) {
        return tmpl.replace(/\{\{[a-z\_]+\}\}/g, function(a) {
            return record[a.substr(2, a.length - 4)];
        });
    },
    random: function(n, m) {
        return parseInt(Math.random() * (m - n) + n);
    },
    hslToRgb: function(arr) {
        var r, g, b, m, c, x, h = arr[0],
            s = arr[1],
            l = arr[2];
        if (!isFinite(h)) h = 0;
        if (!isFinite(s)) s = 0;
        if (!isFinite(l)) l = 0;

        h /= 60
        if (h < 0) h = 6 - (-h % 6)
        h %= 6

        s = Math.max(0, Math.min(1, s / 100));
        l = Math.max(0, Math.min(1, l / 100));

        c = (1 - Math.abs((2 * l) - 1)) * s;
        x = c * (1 - Math.abs((h % 2) - 1));

        if (h < 1) {
            r = c;
            g = x;
            b = 0
        } else if (h < 2) {
            r = x;
            g = c;
            b = 0
        } else if (h < 3) {
            r = 0;
            g = c;
            b = x
        } else if (h < 4) {
            r = 0;
            g = x;
            b = c
        } else if (h < 5) {
            r = x;
            g = 0;
            b = c
        } else {
            r = c;
            g = 0;
            b = x
        }

        m = l - c / 2
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        return [r, g, b];
    },
    shuffle: function(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    },
    setHsl: function() {
        var h = barrage.random(barrage.option.hsl.h[0], barrage.option.hsl.h[1]);
        var s = barrage.random(barrage.option.hsl.s[0], barrage.option.hsl.s[1]);
        var l = barrage.random(barrage.option.hsl.l[0], barrage.option.hsl.l[1]);
        return [h, s, l];
    }
}
