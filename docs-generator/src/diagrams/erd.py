"""
File: docs-generator/src/diagrams/erd.py
Purpose: ERD diagram using a star topology. MEMBERS is the central entity.
         All table positions and arrow anchors are hardcoded to the grid.
All Rights Reserved Arodi Emmanuel
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mp
from . import save_fig, DARK, BLUE, TEAL, GREEN, ORANGE, GRAY, WHITE

TW = 3.0    # table width
RH = 0.30   # row height
HH = 0.44   # header height


def _table(ax, x, y, title, fields, pk, fc, ec):
    """Draw entity table at (x, y). Returns (cx_top, cy_top, cx_bot, cy_bot,
    cx_left, cy_left, cx_right, cy_right) edge midpoints for anchoring."""
    n = len(fields)
    th = HH + n * RH  # total height
    # Outer frame
    ax.add_patch(mp.FancyBboxPatch(
        (x, y), TW, th,
        boxstyle='square,pad=0', linewidth=1.5,
        facecolor='white', edgecolor=ec))
    # Header
    ax.add_patch(mp.Rectangle(
        (x, y + n * RH), TW, HH,
        facecolor=ec, edgecolor=ec))
    ax.text(x + TW / 2, y + n * RH + HH / 2, title,
            ha='center', va='center', fontsize=8,
            fontweight='bold', color=WHITE)
    # Rows
    for i, (col, dtype) in enumerate(fields):
        ry = y + (n - 1 - i) * RH
        bg = fc if col == pk else 'white'
        ec2 = '#B0BEC5'
        ax.add_patch(mp.Rectangle((x, ry), TW, RH,
                                   facecolor=bg, edgecolor=ec2, lw=0.5))
        label = f'[PK] {col}' if col == pk else f'   {col}'
        ax.text(x + 0.1, ry + RH / 2, label,
                va='center', fontsize=7, color=DARK)
        ax.text(x + TW - 0.1, ry + RH / 2, dtype,
                va='center', ha='right', fontsize=6.5, color=TEAL)
    # Return edge midpoints: top, bottom, left, right
    return (x + TW/2, y + th,      # top-center
            x + TW/2, y,           # bottom-center
            x, y + th/2,           # left-center
            x + TW, y + th/2)      # right-center


def _rel(ax, x1, y1, x2, y2, label):
    """Bidirectional relationship arrow between two anchor points."""
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle='<->', color=ORANGE, lw=1.5))
    ax.text((x1+x2)/2 + 0.1, (y1+y2)/2 + 0.12,
            label, fontsize=8.5, color=ORANGE, fontweight='bold')


def generate():
    """Render the star-topology ERD with MEMBERS at center."""
    fig, ax = plt.subplots(figsize=(14, 9))
    ax.set_xlim(0, 14), ax.set_ylim(0, 9)
    ax.axis('off')
    ax.text(7, 8.7, 'Figura 3.3  Esquema Entidad-Relación (3NF)',
            ha='center', fontsize=11, fontweight='bold', color=DARK)

    members = [('id','UUID'), ('first_name','VARCHAR'), ('last_name','VARCHAR'),
               ('email','VARCHAR UNIQUE'), ('status','ENUM'),
               ('created_at','TIMESTAMP')]
    bio = [('member_id','UUID FK'), ('fingerprint_data','BYTEA'),
           ('algorithm_version','VARCHAR')]
    subs = [('id','UUID'), ('member_id','UUID FK'), ('start_date','DATE'),
            ('end_date','DATE'), ('plan_type','ENUM'), ('is_active','BOOLEAN')]
    logs = [('id','UUID'), ('member_id','UUID FK'), ('access_time','TIMESTAMP'),
            ('result','ENUM'), ('device_id','VARCHAR')]

    # MEMBERS: center  x=5.0, y=3.2 → height=0.44+6*0.30=2.24 → top=5.44
    mx, my = 5.0, 3.2
    mw = (mx+TW/2, my+2.24, mx+TW/2, my, mx, my+1.12, mx+TW, my+1.12)
    _table(ax, mx, my, 'MEMBERS', members, 'id', '#E3F2FD', BLUE)

    # BIOMETRIC_TEMPLATES: top-center  x=5.0, y=6.2 → height=1.34 → bottom=6.2
    _table(ax, 5.0, 6.2, 'BIOMETRIC_TEMPLATES', bio, 'member_id', '#E0F2F1', TEAL)
    # Connect: BIO bottom-center (6.5, 6.2) → MEMBERS top-center (6.5, 5.44)
    _rel(ax, 6.5, 6.2, 6.5, 5.44, '1:1')

    # SUBSCRIPTIONS: right  x=9.5, y=3.2 → height=2.24 → left edge=9.5
    _table(ax, 9.5, 3.2, 'SUBSCRIPTIONS', subs, 'id', '#F3E5F5', '#6A1B9A')
    # Connect: SUBS left-center (9.5, 4.32) → MEMBERS right-center (8.0, 4.32)
    _rel(ax, 8.0, 4.32, 9.5, 4.32, '1:N')

    # ACCESS_LOGS: bottom-center  x=5.0, y=0.5 → height=1.94 → top=2.44
    _table(ax, 5.0, 0.5, 'ACCESS_LOGS', logs, 'id', '#FFF3E0', ORANGE)
    # Connect: LOGS top-center (6.5, 2.44) → MEMBERS bottom-center (6.5, 3.2)
    _rel(ax, 6.5, 2.44, 6.5, 3.2, '1:N')

    save_fig(fig, 'fig_erd.png')
